/*
 * Copyright (C) 2018 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

const actions = {}

actions.LTI_KEYS_SET_LTI_KEY = 'LTI_KEYS_SET_LTI_KEY'
actions.ltiKeysSetLtiKey = payload => ({
  type: actions.LTI_KEYS_SET_LTI_KEY,
  payload
})

actions.LTI_KEYS_SET_CUSTOMIZING = 'LTI_KEYS_SET_CUSTOMIZING'
actions.ltiKeysSetCustomizing = payload => ({
  type: actions.LTI_KEYS_SET_CUSTOMIZING,
  payload
})

actions.LTI_KEYS_SET_ENABLED_SCOPES = 'LTI_KEYS_SET_ENABLED_SCOPES'
actions.ltiKeysSetEnabledScopes = payload => ({
  type: actions.LTI_KEYS_SET_ENABLED_SCOPES,
  payload
})

actions.LTI_KEYS_SET_DISABLED_PLACEMENTS = 'LTI_KEYS_SET_DISABLED_PLACEMENTS'
actions.ltiKeysSetDisabledPlacements = payload => ({
  type: actions.LTI_KEYS_SET_DISABLED_PLACEMENTS,
  payload
})

export default actions