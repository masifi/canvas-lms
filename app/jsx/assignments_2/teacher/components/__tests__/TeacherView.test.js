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

import {fireEvent, wait, waitForElement} from 'react-testing-library'
import {mockAssignment, findInputForLabel, workflowMutationResult} from '../../test-utils'
import {
  renderTeacherView,
  renderTeacherQueryAndWaitForResult
} from './integration/integration-utils'

describe('TeacherView', () => {
  describe('basic TeacherView stuff', () => {
    it('shows the message students who dialog when the unsubmitted button is clicked', async () => {
      const {getByText, getByTestId} = await renderTeacherView()
      fireEvent.click(getByText(/unsubmitted/i))
      expect(await waitForElement(() => getByTestId('message-students-who'))).toBeInTheDocument()
    })

    it('shows the message students who dialog when the message students who button is clicked', async () => {
      const {getByText, getByTestId} = await renderTeacherView(
        mockAssignment({submissionTypes: ['none']})
      )
      fireEvent.click(getByText(/message students who/i))
      expect(await waitForElement(() => getByTestId('message-students-who'))).toBeInTheDocument()
    })

    it('shows the assignment', async () => {
      const assignment = mockAssignment()
      const {getByText} = await renderTeacherView(assignment)
      expect(await waitForElement(() => getByText(assignment.name))).toBeInTheDocument()
      expect(
        await waitForElement(() => getByText(`${assignment.pointsPossible}`))
      ).toBeInTheDocument()
      expect(await waitForElement(() => getByText('Everyone'))).toBeInTheDocument()
      expect(await waitForElement(() => getByText('Due:', {exact: false}))).toBeInTheDocument()
      expect(await waitForElement(() => getByText('Available', {exact: false}))).toBeInTheDocument()
    })
  })

  describe('publish toggle', () => {
    it('unpublishes the assignment', async () => {
      const assignment = mockAssignment()
      const {getByText, container} = await renderTeacherQueryAndWaitForResult(assignment, [
        workflowMutationResult(assignment, 'unpublished')
      ])
      const publish = getByText('publish', {exact: false})
      const publishCheckbox = findInputForLabel(publish, container)
      expect(publishCheckbox.checked).toBe(true)
      fireEvent.click(publishCheckbox)
      expect(publishCheckbox.getAttribute('disabled')).toBe('')
      expect(publishCheckbox.checked).toBe(false) // optimistic update
      // make sure the mutation finishes
      await wait(() => {
        expect(publishCheckbox.getAttribute('disabled')).toBe(null)
      })
    })

    it('publishes the assignment', async () => {
      const assignment = mockAssignment({state: 'unpublished'})
      const {getByText, container} = await renderTeacherQueryAndWaitForResult(assignment, [
        workflowMutationResult(assignment, 'published')
      ])
      const publish = getByText('publish', {exact: false})
      const publishCheckbox = findInputForLabel(publish, container)
      expect(publishCheckbox.checked).toBe(false)
      fireEvent.click(publishCheckbox)
      expect(publishCheckbox.getAttribute('disabled')).toBe('')
      expect(publishCheckbox.checked).toBe(true) // optimistic update
      await wait(() => {
        expect(publishCheckbox.getAttribute('disabled')).toBe(null)
      })
    })
  })
})
