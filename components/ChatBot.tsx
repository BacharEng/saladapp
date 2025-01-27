import React, {useState, useEffect} from "react";
import {View, Text, Button, ScrollView, StyleSheet} from 'react-native';
import chatSteps from "./ChatLogic";
import useChatStore from "./useChatStore";


const ChatBot: React.FC = () => {

    const {messages,pathHistory,addMessage,setPathHistory,popPathHistory} = useChatStore();
    const [currentStep, setCurrentStep] = useState('start');

    useEffect(() => {
        addMessage({ sender: 'bot', text: chatSteps[currentStep].message });
    },[currentStep, addMessage])

    const showBackButton = pathHistory.length > 1;

    const handleOptionClick = (nextStep) => {
        setPathHistory(nextStep)
        setCurrentStep(nextStep)
    }

    const handleBack = () => {
        if(pathHistory.length > 1){
            popPathHistory();
            const previousStep = pathHistory[pathHistory.length -2];
            setCurrentStep(previousStep);
        }
    }

    return(
        
            <View style={styles.container}>
                <ScrollView>
                {
                    messages.map((message, index) => (
                        <View key={index}><Text style={{fontSize:17}}>{message.text}</Text></View>
                    ))
                }
                {
                    chatSteps[currentStep].options.map((option, index) => (<>
                        <Button onPress={() => {handleOptionClick(option.nextStep)}} key={index} title={option.text} />
                    </>))
                }
                {
                    showBackButton && (<Button title='Back' onPress={handleBack} />)
                }
                </ScrollView>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00cc99',
        alignItems: 'center',
        justifyContent: 'center',
        padding:50
      },
})

export default ChatBot;