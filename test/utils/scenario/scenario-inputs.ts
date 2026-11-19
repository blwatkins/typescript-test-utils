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

import { Scenario, nonStringInputs } from '../../../src';

export const invalidInputScenarioShapes: object[] = [
    { label: 'label' },
    { label: 'label', input: 1, inputs: [1] },
    { label: 'label', input: 1, inputs: [] },
    { label: 'label', inputs: [] }
];

export const scenarioShapes: Scenario[] = [
    { label: 'label', input: 1, expected: 1 },
    { label: 'label', inputs: [1], expected: 1 },
    { label: 'label', input: 1, expectedError: TypeError },
    { label: 'label', inputs: [1], expectedError: TypeError }
];

export const nonStringLabelScenarioInputs: object[] = [...scenarioShapes, {}].flatMap((scenario: object): object[] => {
    return nonStringInputs.map((label: unknown): object => {
        return { ...scenario, label };
    });
});

export const missingLabelScenarioInputs: object[] = scenarioShapes.map((scenario: Scenario): object => {
    const scenarioCopy: { label?: string; } = { ...scenario };
    delete scenarioCopy.label;
    return scenarioCopy;
});

export const inputScenarioShapes: object[] = [
    { label: 'label', input: 1 },
    { label: 'label', inputs: [1] }
];
