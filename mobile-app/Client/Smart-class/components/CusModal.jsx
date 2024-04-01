import { Modal, View, TouchableOpacity,Text } from "react-native";
import { colors } from "../style/global";

export default function CusModal({children, handleSubmit, isVisible ,setVisibleState, title}) {
    return(
        <>
             <Modal
                    animationType="slice"
                    transparent={true}
                    visible={isVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View className="flex flex-1 justify-center items-center">
                        <View className="w-64 rounded-3xl p-3.5" style={{ backgroundColor: colors.primary60 }}>
                            <Text className="text-white font-bold text-lg mx-auto">{title}</Text>
                            <View className="flex flex-col gap-4 justify-center mb-4">
                               {children}
                            </View>
                            <View className="flex flex-row justify-end gap-4">
                                <TouchableOpacity
                                    className="rounded-xl p-4 bg-red-400"
                                    onPress={() => setVisibleState()}>
                                    <Text className="text-white font-semibold" >Huỷ</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className="rounded-xl p-4 bg-green-400"
                                    onPress={() => {setVisibleState() ; if (handleSubmit !== null) handleSubmit();}}>
                                    <Text className="text-white font-semibold">Gửi</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
        </>
    )
}