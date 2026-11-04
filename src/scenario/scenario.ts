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

import { isBaseScenario } from './base-scenario';
import { ErrorScenario } from './error-scenario';
import { ValueScenario } from './value-scenario';

/**
 * A set of inputs that share an expected outcome.
 *
 * @since 0.1.0
 */
export type Scenario = ValueScenario | ErrorScenario;

/**
 * Is `input` a {@link ValueScenario}?
 *
 * @remarks For `input` to be a valid {@link ValueScenario}, it must have a {@link ValueScenario.expected} property.
 *
 * @see {@link isBaseScenario}
 *
 * @param {Scenario} input - The {@link Scenario} to check.
 *
 * @returns {input is ValueScenario} `true` if input is a {@link ValueScenario} object; `false` otherwise.
 */
export function isValueScenario(input: Scenario): input is ValueScenario {
    return isBaseScenario(input) && 'expected' in input;
}

/**
 * Is `input` an {@link ErrorScenario}?
 *
 * @remarks For `input` to be a valid {@link ErrorScenario}, it must have an {@link ErrorScenario.expectedError} property.
 *
 * @see {@link isBaseScenario}
 *
 * @param {Scenario} input - The {@link Scenario} to check.
 *
 * @returns {input is ErrorScenario} `true` if input is an {@link ErrorScenario} object; `false` otherwise.
 */
export function isErrorScenario(input: Scenario): input is ErrorScenario {
    return isBaseScenario(input) && 'expectedError' in input;
}
