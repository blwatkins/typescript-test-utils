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

function equalValue(expected: unknown, actual: unknown, isEqual?: (expected: unknown, actual: unknown) => boolean): boolean {
    if (isEqual) return isEqual(expected, actual);
    return Object.is(expected, actual);
}

function getInputs(scenario: Scenario): unknown[] {
    if (isSingleInputScenario(scenario)) {
        return [scenario.input];
    } else {
        return scenario.inputs;
    }
}

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
