import React, { useState, useCallback } from 'react'
import styled from '@emotion/styled'

import { DATA_SOURCE_ONE, DATA_SOURCE_TWO } from './datasource'
import Selector from './containers/selector'
import useDebounce from './hooks/useDebounce'

const Container = styled.section`
  display: block;
  padding: 100px 0;
  max-width: 300px;
  margin: 0 auto;
`

const App = () => {
  const [selectedList, setSelectedList] = useState<string[]>([])

  const [callbackResult, dispatchDebounce] = useDebounce()

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatchDebounce(() => {
      console.log('User Wrote something...', e.target.value)
    }, 500)

  const handleSubmitSelector = useCallback((nextSelectedList: string[]) => {
    setSelectedList(nextSelectedList)
  }, [])

  return (
    <Container>
      <Selector
        list={DATA_SOURCE_TWO}
        placeholder="밸류 선택"
        selected={selectedList}
        onChange={handleChangeInput}
        onSubmit={handleSubmitSelector}
      />
    </Container>
  )
}

export default App
