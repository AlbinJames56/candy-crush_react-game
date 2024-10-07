import React, { useEffect, useState } from "react";
import "./GameBoard.css";
import red from "./assets/red.webp";
import yellow from "./assets/yellow.webp";
import blue from "./assets/blue.webp";
import green from "./assets/green.webp";
import pink from "./assets/pink.webp";
import redB from "./assets/blueB.png";
import blueB from "./assets/blueB.png";
import greenB from "./assets/greenB.png";
import yellowB from "./assets/yellowB.png";
import pinkB from "./assets/pinkB.png";
import bgImg from "./assets/bgImg.jpg";

const width = 8;
const candyColors = [red, yellow, pink, blue, green];

const GameBoard = () => {
  const [currentBoard, setCurrentBoard] = useState([]);

  // Initialize board with random candies
  const createBoard = () => {
    const randomBoard = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomBoard.push(randomColor);
    }
    setCurrentBoard(randomBoard);
  };

  // Check for horizontal or vertical matches of 3
  const checkForMatches = () => {
    let isMatchFound = false;

    // Horizontal matches of 3
    for (let i = 0; i < width * width; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentBoard[i];
      const isBlank = currentBoard[i] === "";
      // Check if there's a bonus candy in the match
      const hasBonusCandy = rowOfThree.some((i) =>
        [redB, blueB, yellowB, greenB, pinkB].some(
          (bonusCandy) => currentBoard[i] === bonusCandy
        )
      );
      if (i % width < width - 2) {
        if (
          rowOfThree.every((i) => currentBoard[i] == decidedColor && !isBlank)
        ) {
          if (hasBonusCandy) {
            // Clear the entire row and column when a bonus candy is involved
            const rowStart = Math.floor(i / width) * width;
            // Clear the row
            for (let j = rowStart; j < rowStart + width; j++) {
              currentBoard[j] = "";
            }
            // Clear the column
            const columnStart = i % width;
            for (let j = columnStart; j < width * width; j += width) {
              currentBoard[j] = "";
            }
          } else {
            // Regular match of 3, just clear the matched candies
            rowOfThree.forEach((index) => (currentBoard[index] = ""));
          }

          isMatchFound = true;
        }
      }
    }

    // Vertical matches of 3
    for (let i = 0; i < width * (width - 2); i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentBoard[i];
      const isBlank = currentBoard[i] === "";

      if (
        columnOfThree.every(
          (index) => currentBoard[index] === decidedColor && !isBlank
        )
      ) {
        // Check if there's a bonus candy in the match
        const hasBonusCandy = columnOfThree.some((index) =>
          currentBoard[index].includes({ redB })
        );

        if (hasBonusCandy) {
          // Clear the entire column if a bonus candy is involved
          const columnStart = i % width;
          for (let j = columnStart; j < width * width; j += width) {
            currentBoard[j] = "";
          }
        } else {
          // Regular match of 3, just clear the matched candies
          columnOfThree.forEach((index) => (currentBoard[index] = ""));
        }

        isMatchFound = true;
      }
    }

    setCurrentBoard([...currentBoard]); // Trigger a re-render
    return isMatchFound;
  };
  const extractColorName = (path) => {
    // Split the path by '/' and get the last part (the file name)
    const fileName = path.split("/").pop();

    // Remove the file extension and return the color name
    return fileName.replace(".webp", "");
  };
  //   check for match of 4
  const checkForMatches4 = () => {
    let isMatchFound = false;

    // Horizontal matches of 4
    for (let i = 0; i < width * width; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentBoard[i];
      const isBlank = currentBoard[i] === "";

      if (i % width < width - 3) {
        // Ensure it fits in the row
        if (
          rowOfFour.every(
            (index) => currentBoard[index] === decidedColor && !isBlank
          )
        ) {
          const colorName = extractColorName(decidedColor);
          // Create a bonus candy based on the matched color
          if (colorName === "red") {
            currentBoard[i] = redB;
          } else if (colorName === "blue") {
            currentBoard[i] = blueB;
          } else if (colorName === "yellow") {
            currentBoard[i] = yellowB;
          } else if (colorName === "pink") {
            currentBoard[i] = pinkB;
          } else if (colorName === "green") {
            currentBoard[i] = greenB;
          }

          // Clear the rest of the matched candies
          rowOfFour.slice(1).forEach((index) => (currentBoard[index] = ""));
          isMatchFound = true;
        }
      }
    }

    // Vertical matches of 4
    for (let i = 0; i < width * (width - 3); i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentBoard[i];
      const isBlank = currentBoard[i] === "";

      if (
        columnOfFour.every(
          (index) => currentBoard[index] === decidedColor && !isBlank
        )
      ) {
        const colorName = extractColorName(decidedColor);
        // Create a bonus candy based on the matched color
        if (colorName === "red") {
          currentBoard[i] = redB;
        } else if (colorName === "blue") {
          currentBoard[i] = blueB;
        } else if (colorName === "yellow") {
          currentBoard[i] = yellowB;
        } else if (colorName === "pink") {
          currentBoard[i] = pinkB;
        } else if (colorName === "green") {
          currentBoard[i] = greenB;
        }
        // Clear the rest of the matched candies
        columnOfFour.slice(1).forEach((index) => (currentBoard[index] = ""));
        isMatchFound = true;
      }
    }

    setCurrentBoard([...currentBoard]); // Trigger a re-render
    return isMatchFound;
  };

  // Move candies down after matches are found
  const moveCandiesDown = () => {
    for (let i = 0; i < width * (width - 1); i++) {
      if (currentBoard[i + width] === "") {
        currentBoard[i + width] = currentBoard[i];
        currentBoard[i] = "";
      }
    }

    // Refill top row with new candies
    for (let i = 0; i < width; i++) {
      if (currentBoard[i] === "") {
        currentBoard[i] =
          candyColors[Math.floor(Math.random() * candyColors.length)];
      }
    }

    setCurrentBoard([...currentBoard]); // Trigger a re-render
  };

  useEffect(() => {
    createBoard();
  }, []);

  // Periodically check for matches and move candies down
  useEffect(() => {
    const interval = setInterval(() => {
      checkForMatches4(); // Check for matches of 4 first
      checkForMatches(); // Then check for matches of 3
      moveCandiesDown();
    }, 100);
    return () => clearInterval(interval);
  }, [currentBoard]);

  const [firstClick, setFirstClick] = useState(true);
  const [secondCell, setSecondCell] = useState(null);
  const [firstCell, setFirstCell] = useState(null);

  const Click = (i) => {
    let dummyClick = firstClick;
    const validMoves = [
      firstCell - 1,
      firstCell + 1,
      firstCell - width,
      firstCell + width,
    ];
    if (firstClick) {
      setFirstCell(i);
      setSecondCell(null);
    } else if (validMoves.includes(i)) {
      setSecondCell(i);
      let firstCandy = currentBoard[firstCell];
      let secondCandy = currentBoard[i];

      // Perform the swap
      currentBoard[firstCell] = secondCandy;
      currentBoard[i] = firstCandy;

      setFirstCell(null);
      const isMatch = checkForMatches4() || checkForMatches();

      // If no match is found, revert the swap
      if (!isMatch) {
        setTimeout(() => {
          currentBoard[firstCell] = firstCandy;
          currentBoard[i] = secondCandy;
          setCurrentBoard([...currentBoard]);
        }, 200);
      } else {
        setCurrentBoard([...currentBoard]);
      }
    }
    dummyClick = !dummyClick;
    setFirstClick(dummyClick);
  };

  return (
    <div
      className=""
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container d-flex align-items-center justify-content-center py-5">
        <div className="">
          {/* <h4 className="text-center fw-bolder m-2">Candy Crush</h4> */}
          <div className="game-board mt-5 p-3">
            {currentBoard.map((candyColor, index) => (
              <div
                key={index}
                style={{
                  color: { candyColor },
                  backgroundImage: `url(${candyColor})`,
                  backgroundSize: "contain",
                  backgroundRepeat:"no-repeat",
                  border:
                    firstCell === index
                      ? "3px solid #000"
                      : secondCell === index
                      ? "3px solid #f00"
                      : "none",
                }}
                className="candy-tile "
                data-id={index}
                onClick={() => Click(index)}
                onDragOver={(e) => e.preventDefault()}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
