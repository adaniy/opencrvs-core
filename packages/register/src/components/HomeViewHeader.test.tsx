import * as React from 'react'
import { createShallowRenderedComponent } from '@register/tests/util'
import { HomeViewHeader } from '@register/components/HomeViewHeader'

describe('home view header component', () => {
  const testComponent = createShallowRenderedComponent(
    <HomeViewHeader
      id="test_heaader"
      title="Test title"
      description="Test description"
    />
  )

  it('renders without crashing', () => {
    expect(testComponent).toMatchSnapshot()
  })
})
