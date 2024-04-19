import {Modal, View, TouchableOpacity, Text, Pressable} from "react-native";
import {colors} from "../style/global";
import {formRegisClassStyle} from "../style/regis-class-style";
import { loginStyles } from "../style/login-style";

export default function CusModal({children, handleSubmit, isVisible, setVisibleState, title}) {
    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={isVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={formRegisClassStyle.centeredView}>
                    <View style={formRegisClassStyle.modalStyle} className={"mx-2"}>
                        <Text className={"mb-5"} style={{fontSize: 20, fontWeight: "700"}}>{title}</Text>
                        <View>
                            {children}
                        </View>
                        <TouchableOpacity style={formRegisClassStyle.btnStyle}
                                   onPress={() => {
                                       setVisibleState();
                                       if (handleSubmit !== null) handleSubmit();
                                   }}>
                            <Text style={loginStyles.buttonText}>
                                Submit
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                loginStyles.buttonUp,
                            ]}
                            onPress={() => setVisibleState()}
                        >
                            <Text
                                style={loginStyles.buttonTextUp}
                            >
                                Cancle
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    )
}