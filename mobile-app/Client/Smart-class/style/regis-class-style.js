import { StyleSheet } from "react-native";
import { colors } from "./global";
export const deleteRegistedClassStyle = StyleSheet.create({
  modalStyle: {
    backgroundColor: colors.white,
    borderRadius: 15,
    alignItems: "center",
    width: "90%",
    padding: 15,
    gap: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  submitBtn: {
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  deleteBtn: {
    backgroundColor: "#DD5746",
  },
  cancleBtn: {
    backgroundColor: colors.bgColor,
    opacity: 0.7,
  },
  textBtn: {
    fontSize: 16,
    fontWeight: "600",
  },
});
export const formRegisClassStyle = StyleSheet.create({
  modalStyle: {
    backgroundColor: colors.white,
    borderRadius: 15,
    marginTop: 22,
    alignItems: "center",
    width: "90%",
    padding: 20,
    gap: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  inputStyle: {
    width: "100%",
  },
  btnStyle: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    backgroundColor: colors.btnColor,
    padding: 14,
    borderRadius: 10,
  },
  cancleBtn: {
    backgroundColor: colors.transparent,
  },
});
export const registerClassStyle = StyleSheet.create({
  regisClassBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.primary80,
    padding: 12,
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 12,
    borderRadius: 10,
  },
  containerListClass: {
    width: "100%",
    padding: 10,
    height: "100%",
  },
});
export const registerClassItemStyle = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: colors.bgColor,
    alignItems: "center",
    borderRadius: 10,
    padding: 8,
    marginVertical: 5,
    gap: 10,
  },
  iconContainer: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
  insideContainer: {
    display: "flex",
    flexDirection: "row",
  },
  headerCotainer: {
    flexDirection: "column",
  },
});

