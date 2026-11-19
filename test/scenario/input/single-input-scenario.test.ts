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

import { describe, test, expect } from 'vitest';

import {
    MultiInputScenario,
    ValueScenario,
    isSingleInputScenario,
    denseArrayInputs,
    nonObjectInputs
} from '../../../src';

import { nonObjectScenarioInputs, nonStringLabelScenarioInputs, unlabeledScenarioInputs } from '../../utils/scenario/scenario-inputs';

describe('Single Input Scenario', (): void => {
    const anyInputs: unknown[] = [...nonObjectInputs, ...denseArrayInputs, {}];
    const definedInputs: unknown[] = anyInputs.filter((input: unknown): boolean => {
        return input !== undefined;
    });

    describe('isSingleInputScenario', (): void => {
        const scenarios: (MultiInputScenario & ValueScenario)[] = [
            {
                label: 'Any input',
                inputs: anyInputs.map((input: unknown): object => {
                    return { label: 'label', input };
                }),
                expected: true
            },
            {
                label: 'Any input with undefined inputs',
                inputs: anyInputs.map((input: unknown): object => {
                    return { label: 'label', input, inputs: undefined };
                }),
                expected: true
            },
            {
                label: 'Missing input',
                inputs: [{ label: 'label' }],
                expected: false
            },
            {
                label: 'Defined inputs',
                inputs: definedInputs.map((inputs: unknown): object => {
                    return { label: 'label', input: 1, inputs };
                }),
                expected: false
            },
            {
                label: 'Non-object inputs',
                inputs: nonObjectScenarioInputs,
                expected: false
            },
            {
                label: 'Unlabeled scenarios',
                inputs: unlabeledScenarioInputs,
                expected: false
            },
            {
                label: 'Scenarios with a non-string label',
                inputs: nonStringLabelScenarioInputs,
                expected: false
            }
        ];

        describe.each(
            scenarios
        )('%# - $label', ({ inputs: scenarioInputs, expected: scenarioExpected }: MultiInputScenario & ValueScenario): void => {
            test(`Should return ${String(scenarioExpected)} for every input`, (): void => {
                expect(scenarioInputs.filter((input: unknown): boolean => {
                    return isSingleInputScenario(input) !== scenarioExpected;
                })).toEqual([]);
            });
        });
    });
});
