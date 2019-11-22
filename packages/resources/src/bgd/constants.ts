/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * OpenCRVS is also distributed under the terms of the Civil Registration
 * & Healthcare Disclaimer located at http://opencrvs.org/license.
 *
 * Copyright (C) The OpenCRVS Authors. OpenCRVS and the OpenCRVS
 * graphic logo are (registered/a) trademark(s) of Plan International.
 */
import * as path from 'path'
import { readFileSync } from 'fs'

export const ADMIN_STRUCTURE_SOURCE = path.join(
  process.cwd(),
  'src/bgd/features/administrative/generated/'
)
export const GEO_JSON_SOURCE = path.join(
  process.cwd(),
  'src/bgd/features/administrative/scripts/geojson/'
)
export const FACILITIES_SOURCE = path.join(
  process.cwd(),
  'src/bgd/features/facilities/generated/'
)
export const EMPLOYEES_SOURCE = path.join(
  process.cwd(),
  'src/bgd/features/employees/generated/'
)
export const HRIS_FACILITIES_URL =
  process.env.HRIS_FACILITIES_URL ||
  'http://hris.mohfw.gov.bd/api/1.0/facilities/get'
export const LANGUAGES_SOURCE = path.join(
  process.cwd(),
  'src/bgd/features/languages/generated/'
)
export const SEQUENCE_NUMBER_SOURCE = path.join(
  process.cwd(),
  'src/bgd/features/generate/sequenceNumbers/'
)
export const ADMINISTRATIVE_STRUCTURE_URL = 'http://esb.beta.doptor.gov.bd:8280'

export const OPENHIM_URL = process.env.OPENHIM_URL || 'http://localhost:5001'

export const OISF_SECRET = process.env.OISF_SECRET
  ? readFileSync(process.env.OISF_SECRET).toString()
  : 'saGtvp5iYa51WiYFWGwVlMUtinKqXoe8S5wv0mNJymxiD9yAr2JdO1bZzTmwQahRezhgL24d9zU6UHatSaEGErmlQgxv9pPh9ggyuhQnFl9DeI7HKfBNkohfosua9PN2a98abHb1kSaUS5BS5Z1QCNNACEX4YdplR1SkSykeIbKkwiU9AgWcKL5dycSdw1Olaz0fFnWjoVCDO26suisQA1hTkTTwuitmaGD611t1koksOxQfc7RLpFbpNBvuYXJT'

export const MIN_SEQ_NUMBER = 0
export const MAX_SEQ_NUMBER = 999999
