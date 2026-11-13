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

import { denseArrayInputs, nonObjectInputs, nonStringInputs, sparseArrayInputs } from '../../../src';

const labeledScenarioShapes: Record<string, unknown>[] = [
    { label: 'label', input: 1, expected: 1 },
    { label: 'label', inputs: [1], expected: 1 },
    { label: 'label', input: 1, expectedError: TypeError },
    { label: 'label', inputs: [1], expectedError: TypeError }
];

export const invalidBaseScenarioInputs: unknown[] = [
    ...nonObjectInputs,
    ...denseArrayInputs,
    ...sparseArrayInputs,
    Object.assign([], { label: 'label' }),
    {},
    ...labeledScenarioShapes.map((shape: Record<string, unknown>): Record<string, unknown> => {
        return Object.fromEntries(Object.entries(shape).filter(([key]: [string, unknown]): boolean => {
            return key !== 'label';
        }));
    }),
    ...labeledScenarioShapes.flatMap((shape: Record<string, unknown>): Record<string, unknown>[] => {
        return nonStringInputs.map((label: unknown): Record<string, unknown> => {
            return { ...shape, label };
        });
    })
];
