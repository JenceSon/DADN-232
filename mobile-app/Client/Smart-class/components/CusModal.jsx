import {Modal, View, TouchableOpacity, Text, Pressable} from "react-native";
import {colors} from "../style/global";
import {formRegisClassStyle} from "../style/regis-class-style";

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
                            <Text style={{color: "white", fontWeight: "500", fontSize: 16}}>
                                Submit
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                formRegisClassStyle.btnStyle,
                            ]}
                            onPress={() => setVisibleState()}
                        >
                            <Text
                                style={{color: "#acacac", fontWeight: "500", fontSize: 16}}
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