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

import {
    MultiInputScenario,
    ValueScenario,
    denseArrayInputs,
    nonObjectInputs,
    sparseArrayInputs,
} from '../../../src';

import { missingLabelScenarioInputs, nonStringLabelScenarioInputs } from './scenario-inputs';

export const invalidBaseScenarioScenarios: (MultiInputScenario & ValueScenario)[] = [
    {
        label: 'Non-object inputs',
        inputs: nonObjectInputs,
        expected: false
    },
    {
        label: 'Array inputs',
        inputs: [
            ...sparseArrayInputs,
            ...denseArrayInputs,
            Object.assign([], { label: 'label' })
        ],
        expected: false
    },
    {
        label: 'Empty object inputs',
        inputs: [{}],
        expected: false
    },
    {
        label: 'Scenarios missing label',
        inputs: missingLabelScenarioInputs,
        expected: false
    },
    {
        label: 'Scenarios with a non-string label',
        inputs: nonStringLabelScenarioInputs,
        expected: false
    }
];

export const invalidInputScenarioScenarios: (MultiInputScenario & ValueScenario)[] = [
    {
        label: 'Error scenarios that are neither single nor multi input',
        inputs: [
            { label: 'label', expectedError: TypeError },
            { label: 'label', input: 1, inputs: [1], expectedError: TypeError },
            { label: 'label', input: 1, inputs: [], expectedError: TypeError },
            { label: 'label', inputs: [], expectedError: TypeError }
        ],
        expected: false
    }
];


