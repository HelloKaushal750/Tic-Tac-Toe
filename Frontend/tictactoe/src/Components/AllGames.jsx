import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from "@chakra-ui/react";
import "../Styles/AllGames.css";

function AllGames({ isOpen, onOpen, onClose, previous }) {
  return (
    <div>
      <Modal onClose={onClose} isOpen={isOpen} isCentered size={"xl"}>
        <ModalOverlay
          backdropBlur="2px"
        />
        <ModalContent>
          <div style={{ backgroundColor: "black", padding: "20px", border:"1px solid grey" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "20px",
                fontWeight: "600",
                color: "yellow",
              }}
            >
              <h1>All Previous Games</h1>
              <ModalCloseButton />
            </div>
            <div className="scrollbar">
              {previous?.map((item) => {
                return (
                  <div
                    style={{
                      color: "white",
                      display: "flex",
                      gap: "20px",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                      fontSize: "20px",
                      borderBottom:"1px solid grey"
                    }}
                  >
                    <h1
                      style={
                        item.result === "X was Winner"
                          ? { color: "#0d9bea" }
                          : { color: "#fe0202" }
                      }
                    >
                      {item.result === "X was Winner"
                        ? "X was winner"
                        : "O was winner"}
                    </h1>
                    <p style={{ fontSize: "12px" }}>{item.datetime}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AllGames;
