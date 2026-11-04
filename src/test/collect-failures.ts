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

import { Scenario, isMultiInputScenario, isValueScenario } from '../scenario';

export function collectFailures(methodToTest: (input: unknown) => unknown, scenario: Scenario): { input: unknown; expected: unknown; actual: unknown; }[] {
    if (isMultiInputScenario(scenario)) {
        return [];
    } else {
        if (isValueScenario(scenario)) {
            try {
                const actual: unknown = methodToTest(scenario.input);

                if (actual !== scenario.expected) {
                    return [{
                        input: scenario.input,
                        expected: scenario.expected,
                        actual
                    }];
                }

                return [];
            } catch (error: unknown) {
                return [{
                    input: scenario.input,
                    expected: scenario.expected,
                    actual: error
                }];
            }
        } else {
            try {
                const actual: unknown = methodToTest(scenario.input);

                return [{
                    input: scenario.input,
                    expected: scenario.expectedError,
                    actual
                }];
            } catch (error: unknown) {
                if (!(error instanceof scenario.expectedError)) {
                    return [{
                        input: scenario.input,
                        expected: scenario.expectedError,
                        actual: error
                    }];
                }

                return []
            }
        }
    }
}
