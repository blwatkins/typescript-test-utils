/*
 * Copyright (c) 2026 Brittni Watkins.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE
 * AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * SPDX-License-Identifier: MIT
 */

import { ErrorClass } from '../error';
import { Scenario, isValueScenario, isSingleInputScenario, isErrorScenario } from '../scenario';

import { Failure } from './failure';

/**
 * Does `actual` equal `expected`?
 *
 * @remarks Uses `isEqual` when it is given, and `Object.is` otherwise.
 *
 * @param {unknown} expected - The expected value.
 * @param {unknown} actual - The actual value.
 * @param {(expected: unknown, actual: unknown) => boolean} [isEqual] - The optional comparison to use instead of `Object.is`.
 *
 * @returns {boolean} `true` when `actual` equals `expected`; `false` otherwise.
 *
 * @private
 */
function equalValue(expected: unknown, actual: unknown, isEqual?: (expected: unknown, actual: unknown) => boolean): boolean {
    if (isEqual) {
        return isEqual(expected, actual);
    }

    return Object.is(expected, actual);
}

/**
 * Gets the inputs of a scenario as an array.
 *
 * @param {Scenario} scenario - The scenario to get the inputs of.
 *
 * @returns {unknown[]} The single input of a {@link SingleInputScenario} in an array, or the inputs of a {@link MultiInputScenario}.
 *
 * @private
 */
function getInputs(scenario: Scenario): unknown[] {
    if (isSingleInputScenario(scenario)) {
        return [scenario.input];
    } else {
        return scenario.inputs;
    }
}

/**
 * Checks that `method` returns `expected` for `input`.
 *
 * @param {(input: unknown) => unknown} method - The method to test.
 * @param {unknown} input - The input to pass to `method`.
 * @param {unknown} expected - The value `method` is expected to return.
 * @param {(expected: unknown, actual: unknown) => boolean} [isEqual] - The optional comparison to use instead of `Object.is`.
 *
 * @returns {Failure | undefined} A {@link Failure} when `method` returns a different value or throws; `undefined` otherwise.
 *
 * @private
 */
function checkValue(
    method: (input: unknown) => unknown,
    input: unknown,
    expected: unknown,
    isEqual?: (expected: unknown, actual: unknown) => boolean
): Failure | undefined {
    try {
        const actual: unknown = method(input);

        if (!equalValue(expected, actual, isEqual)) {
            return {
                input,
                expected,
                actual
            };
        }

        return undefined;
    } catch (error: unknown) {
        return {
            input,
            expected,
            thrown: error
        };
    }
}

/**
 * Checks that `method` throws an instance of `expectedError` for `input`.
 *
 * @param {(input: unknown) => unknown} method - The method to test.
 * @param {unknown} input - The input to pass to `method`.
 * @param {ErrorClass} expectedError - The error class `method` is expected to throw.
 *
 * @returns {Failure | undefined} A {@link Failure} when `method` returns a value or throws a different error; `undefined` otherwise.
 *
 * @private
 */
function checkError(method: (input: unknown) => unknown, input: unknown, expectedError: ErrorClass): Failure | undefined {
    try {
        const actual: unknown = method(input);

        return {
            input,
            expectedError,
            actual
        };
    } catch (error: unknown) {
        if (!(error instanceof expectedError)) {
            return {
                input,
                expectedError,
                thrown: error
            };
        }

        return undefined;
    }
}

/**
 * Runs `methodToTest` on every input of `scenario` and collects the inputs that do not produce the expected outcome.
 *
 * @remarks For a {@link scenario.ValueScenario | ValueScenario}, an input fails when `methodToTest` returns a different value or throws.
 * For an {@link scenario.ErrorScenario | ErrorScenario}, an input fails when `methodToTest` returns a value or throws an error that is not an instance of the scenario's `expectedError`.
 *
 * @see {@link isValueScenario}
 * @see {@link isErrorScenario}
 *
 * @param {(input: unknown) => unknown} methodToTest - The method to test.
 * @param {Scenario} scenario - The scenario that holds the inputs and the expected outcome.
 * @param {(expected: unknown, actual: unknown) => boolean} [isEqual] - The optional comparison to use instead of `Object.is` for a {@link scenario.ValueScenario | ValueScenario}.
 *
 * @returns {Failure[]} A {@link Failure} for each input that does not produce the expected outcome, in input order.
 *
 * @throws {TypeError} When `methodToTest` is not a function.
 * @throws {TypeError} When `scenario` is not a valid {@link scenario.ValueScenario | ValueScenario} or {@link scenario.ErrorScenario | ErrorScenario}.
 * @throws {TypeError} When `isEqual` is neither a function nor `undefined`.
 *
 * @since 0.1.0
 */
export function collectFailures(methodToTest: (input: unknown) => unknown, scenario: Scenario, isEqual?: (expected: unknown, actual: unknown) => boolean): Failure[] {
    if (typeof methodToTest !== 'function') {
        throw new TypeError('methodToTest must be a function.');
    }

    if (!(isValueScenario(scenario) || isErrorScenario(scenario))) {
        throw new TypeError('scenario must be a valid ValueScenario or ErrorScenario.');
    }

    if (isEqual !== undefined && typeof isEqual !== 'function') {
        throw new TypeError('isEqual must be a function or undefined.');
    }

    const failures: Failure[] = [];
    const inputs: unknown[] = getInputs(scenario);

    for (const input of inputs) {
        let failure: Failure | undefined;

        if (isValueScenario(scenario)) {
            failure = checkValue(methodToTest, input, scenario.expected, isEqual);
        } else {
            failure = checkError(methodToTest, input, scenario.expectedError);
        }

        if (failure) {
            failures.push(failure);
        }
    }

    return failures;
}
