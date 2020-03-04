import React from 'react';
import {StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Text} from 'react-native';
import {storeObserver, StorePropType} from '../store';
import * as MagicMove from 'react-native-magic-move';
import * as Animatable from 'react-native-animatable';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: 'blueviolet',
    justifyContent: 'center',
  },
  title: {
    alignSelf: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: 50,
  },
  text: {
    margin: 24,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 19,
    lineHeight: 24,
  },
});

class Scene extends React.Component {
  static propTypes = {
    store: StorePropType,
  };
  static navigationOptions = {
    title: 'Scale',
  };
  constructor(props) {
    super(props);
    this.state = { fontSize: 12 };
  }

  bounce = () => this.view.bounce(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));

  render() {
    const {debug} = this.props.store;
    return (
      <MagicMove.Scene style={styles.container}>
        <MagicMove.View id="scene1" style={styles.background}>
          <MagicMove.Text id="scene1.title" style={styles.title}>
            Magic Move
          </MagicMove.Text>
          <MagicMove.Context>
            {({isClone, isTarget}) =>
              isClone && isTarget ? (
                undefined
              ) : (<>

              <Animatable.Text animation={{
              from: {
                  opacity: 0,
                },
                to: {
                  opacity: 1,
                },
              }} >Fade me in</Animatable.Text>

               <TouchableWithoutFeedback onPress={this.bounce}>
                  <Animatable.View ref={ref => this.view = ref}>
                    <Text>Bounce me!</Text>
                  </Animatable.View>
                </TouchableWithoutFeedback>


                <Animatable.Text
                  style={styles.text}
                  animation="fadeInUp"
                  delay={debug ? 8000 : 400}
                  duration={500}
                  >
                  Magically animate your component from one scene to another.
                </Animatable.Text>
                <Animatable.Text animation="slideInDown" iterationCount={5} direction="alternate">Up and down you go</Animatable.Text>
                <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={{ textAlign: 'center' }}>❤️</Animatable.Text>
                <TouchableOpacity onPress={() => this.setState({fontSize: (this.state.fontSize || 10) + 5 })}>
                  <Animatable.Text transition="fontSize" style={{fontSize: this.state.fontSize || 10}}>Size me up, Scotty</Animatable.Text>
                </TouchableOpacity>
                </>
              )
            }
          </MagicMove.Context>
        </MagicMove.View>
      </MagicMove.Scene>
    );
  }
}

export default storeObserver(Scene);
