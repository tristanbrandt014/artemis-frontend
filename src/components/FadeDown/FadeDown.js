// @flow weak
import React from "react"
import Aux from "react-aux"
import { spring, TransitionMotion } from "react-motion"

type Props = {
  show: boolean,
  component: React$Component<Object, Object>
}

const willLeave = () => ({ opacity: spring(0), marginTop: spring(-30) })

const didEnter = () => ({ opacity: spring(1), marginTop: spring(0) })

const willEnter = () => ({ opacity: 0, marginTop: -30 })

const FadeDown = (props: Props) => {
  const Child = props.component
  return (
    <TransitionMotion
      styles={() => [
        ...(props.show
          ? [
              {
                key: 0,
                style: {
                  opacity: spring(1),
                  marginTop: spring(0)
                },
                data: Child
              }
            ]
          : [])
      ]}
      willLeave={willLeave}
      didEnter={didEnter}
      willEnter={willEnter}
    >
      {interpolated => (
        <Aux>
          {interpolated.map(({ key, style, data: Child }) => (
            // $FlowFixMe
            <Child style={style} key={`${key}-transition`} />
          ))}
        </Aux>
      )}
    </TransitionMotion>
  )
}

export default FadeDown
