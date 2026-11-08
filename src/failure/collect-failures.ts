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
import { Scenario, isErrorScenario, isSingleInputScenario, isValueScenario } from '../scenario';

import { Failure } from './failure';

/**
 * Does `actual` equal `expected`?
 *
 * @remarks If `isEqual` is `undefined`, this method will compare `expected` and `actual` using {@link Object.is}.
 *
 * @param {unknown} expected - The expected value.
 * @param {unknown} actual - The actual value.
 * @param {(expected: unknown, actual: unknown) => boolean} [isEqual] - The optional comparison method.
 * This method should return `true` if `expected` and `actual` are equal or equivalent values.
 *
 * @returns {boolean} `true` when `actual` equals `expected`; `false` otherwise.
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
 * @param {Scenario} scenario - The scenario to get the inputs from.
 *
 * @returns {unknown[]} The inputs of the {@link Scenario}.
 */
function getInputs(scenario: Scenario): unknown[] {
    if (isSingleInputScenario(scenario)) {
        return [scenario.input];
    } else {
        return scenario.inputs;
    }
}

/**
 * Checks whether `methodToTest` returns `expected` for `input`.
 *
 * @param {(input: unknown) => unknown} methodToTest - The method to test.
 * @param {unknown} input - The input to pass to `methodToTest`.
 * @param {unknown} expected - The value `methodToTest` is expected to return.
 * @param {(expected: unknown, actual: unknown) => boolean} [isEqual] - The optional comparison method for comparing the expected value against the actual value returned.
 *
 * @returns {Failure | undefined} A {@link Failure} when `methodToTest` returns a different value or throws; `undefined` otherwise.
 */
function checkValue(
    methodToTest: (input: unknown) => unknown,
    input: unknown,
    expected: unknown,
    isEqual?: (expected: unknown, actual: unknown) => boolean
): Failure | undefined {
    try {
        const actual: unknown = methodToTest(input);

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
 * Checks whether `methodToTest` throws an instance of `expectedError` for `input`.
 *
 * @param {(input: unknown) => unknown} methodToTest - The method to test.
 * @param {unknown} input - The input to pass to `methodToTest`.
 * @param {ErrorClass} expectedError - The error class `methodToTest` is expected to throw.
 *
 * @returns {Failure | undefined} A {@link Failure} when `methodToTest` returns a value or throws a different error; `undefined` otherwise.
 */
function checkError(methodToTest: (input: unknown) => unknown, input: unknown, expectedError: ErrorClass): Failure | undefined {
    try {
        const actual: unknown = methodToTest(input);

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
 * @remarks For a `ValueScenario`, an input fails when `methodToTest` returns a different value or throws.
 * For an `ErrorScenario`, an input fails when `methodToTest` returns a value or throws an error that is not an instance of the scenario's `expectedError`.
 *
 * @see {@link isValueScenario}
 * @see {@link isErrorScenario}
 *
 * @param {(input: unknown) => unknown} methodToTest - The method to test.
 * @param {Scenario} scenario - The scenario that holds the inputs and the expected outcome.
 * @param {(expected: unknown, actual: unknown) => boolean} [isEqual] - The optional comparison method for comparing the expected value against the actual value returned.
 * This method should return `true` if `expected` and `actual` are equal or equivalent values.
 * When not defined, expected and actual values will be compared using {@link Object.is}.
 *
 * @returns {Failure[]} A {@link Failure} for each input that does not produce the expected outcome, in input order.
 *
 * @throws {TypeError} When `methodToTest` is not a function.
 * @throws {TypeError} When `scenario` is not a valid {@link Scenario}.
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
