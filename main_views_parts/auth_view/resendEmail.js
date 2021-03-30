import React, { useState } from 'react';
import { StyleSheet, Modal,Text,KeyboardAvoidingView } from 'react-native';
import {Container,  Form, Input, Item, Button, Label} from 'native-base';
import * as firebase from 'firebase';



const ResendEmail = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    
    //LOGS U IN, DISPLAYS ERROR MESSAGE IF ANY
    const handleReset = (email, password) => {
        firebase.auth()
        .signInWithEmailAndPassword(email.trim(), password)
        .then(() => firebase.auth().currentUser.sendEmailVerification())
        .catch((error) => {this.setState({ errorMessage: error.message })
        console.log(error.message)})
        alert('We sent a new verification link to the email that you specified. It should be there within the next 15 minutes. If you do not receive the link in the next few hours, email us at volleypalapp@gmail.com. Include your email address so we can reset it for you.')
          props.toggleModal()
    }

    
        return (
        
            <Modal
                animationType="slide"
                transparent={false}
                visible={props.modalVisible}
              >



<Container style = {styles.container}>
<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : "height"}>
                <Form>
                <Text style={{padding: 10, fontSize: 17}}>
                    Enter your email and password to resend verification email:
                  </Text>

                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input
                        autoCorrect={false}
                        autoCapitalize='none'
                        onChangeText={(email) => setEmail(email.trim())}
                    value={email}/>
                    </Item>

                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input
                        autoCorrect={false}
                        autoCapitalize='none'
                        onChangeText={(password) => setPassword(password.trim())}
                    value={password}/>
                    </Item>

                    <Button style ={{margin:10}}
                    full
                    rounded
                    success
                    onPress={()=> handleReset(email, password)}>

                        <Text style = {{color:'white'}}>Resend</Text>
                    </Button>

                    <Button style ={{margin:10}}
                    full
                    rounded
                    primary
                    onPress={()=> props.toggleModal()} >

                        <Text style = {{color:'white'}}>Go Back</Text>
                    </Button>

      

                    </Form>
                    </KeyboardAvoidingView>
                </Container>
                  

              </Modal>

        
        
        );
    }


export default ResendEmail;
//onPress={this.forgotPassword(this.state.email)} 

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 40
      },
  
   
  });