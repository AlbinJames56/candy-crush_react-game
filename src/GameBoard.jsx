import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import "./GameBoard.css";
import red from "./assets/red.webp";

import blue from "./assets/blue.webp";
import green from "./assets/green.webp";
import pink from "./assets/pink.webp";
import yellow from "./assets/yellow.webp";
import redB from "./assets/redB.webp";
import blueB from "./assets/blueB.png";
import greenB from "./assets/greenB.png";
import yellowB from "./assets/yellowB.png";
import pinkB from "./assets/pinkB.png";
import bgImg from "./assets/bgImg.jpg";

const width = 8;
const candyColors = [
  { value: 1, color: red, bonus: false },
  { value: 2, color: blue, bonus: false },
  { value: 3, color: green, bonus: false },
  { value: 4, color: pink, bonus: false },
  { value: 5, color: yellow, bonus: false },
  { value: "1", color: redB, bonus: true },
  { value: "2", color: blueB, bonus: true },
  { value: "3", color: greenB, bonus: true },
  { value: "4", color: pinkB, bonus: true },
  { value: "5", color: yellowB, bonus: true },
];

const GameBoard = () => {
  const [currentBoard, setCurrentBoard] = useState([]);

  // Initialize board with random candies
  const createBoard = () => {
    const randomBoard = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor = candyColors.filter((item) => !item.bonus)[
        Math.floor(Math.random() * (candyColors.length / 2))
      ];
      //   console.log(randomColor);

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
    const decidedColor = currentBoard[i]?.value;
    const isBlank = currentBoard[i]?.value === "";

    if (i % width < width - 2) {
      // Check if the match includes a bonus candy
      const containsBonusCandy = rowOfThree.some(
        (index) => currentBoard[index]?.bonus
      );
      
      if (
        rowOfThree.every(
          (index) => currentBoard[index]?.value == decidedColor && !isBlank
        ) && containsBonusCandy
      ) {
        // Match of 3 with bonus, clear the entire row and column
        rowOfThree.forEach((index) => {
          const rowStart = Math.floor(index / width) * width;
          const columnStart = index % width;

          // Clear the entire row
          for (let j = 0; j < width; j++) {
            currentBoard[rowStart + j] = { value: "", color: "", bonus: false };
          }
          // Clear the entire column
          for (let j = 0; j < width; j++) {
            currentBoard[columnStart + j * width] = {
              value: "",
              color: "",
              bonus: false,
            };
          }
        });
        isMatchFound = true;
      }
      // Regular match of 3, no bonus, just clear the matched candies
      else if (
        rowOfThree.every(
          (index) => currentBoard[index]?.value == decidedColor && !isBlank
        )
      ) {
        rowOfThree.forEach(
          (index) => (currentBoard[index] = { value: "", color: "", bonus: false })
        );
        isMatchFound = true;
      }
    }
  }

  // Vertical matches of 3
  for (let i = 0; i < width * (width - 2); i++) {
    const columnOfThree = [i, i + width, i + width * 2];
    const decidedColor = currentBoard[i]?.value;
    const isBlank = currentBoard[i]?.value === "";

    // Check if there's a bonus candy in the match
    const containsBonusCandy = columnOfThree.some(
      (index) => currentBoard[index]?.bonus
    );

    if (
      columnOfThree.every(
        (index) => currentBoard[index]?.value == decidedColor && !isBlank
      ) && containsBonusCandy
    ) {
      // Clear the entire row and column of matched bonus candy
      columnOfThree.forEach((index) => {
        const rowStart = Math.floor(index / width) * width;
        const columnStart = index % width;

        // Clear the entire row
        for (let j = 0; j < width; j++) {
          currentBoard[rowStart + j] = { value: "", color: "", bonus: false };
        }
        // Clear the entire column
        for (let j = 0; j < width; j++) {
          currentBoard[columnStart + j * width] = {
            value: "",
            color: "",
            bonus: false,
          };
        }
      });
      isMatchFound = true;
    }
    // Regular match of 3, just clear the matched candies
    else if (
      columnOfThree.every(
        (index) => currentBoard[index]?.value == decidedColor && !isBlank
      )
    ) {
      columnOfThree.forEach(
        (index) => (currentBoard[index] = { value: "", color: "", bonus: false })
      );
      isMatchFound = true;
    }
  }

  setCurrentBoard([...currentBoard]); // Trigger a re-render
  return isMatchFound;
};

  //   check for match of 4
  const checkForMatches4 = () => {
    let isMatchFound = false;

    // Horizontal matches of 4
    for (let i = 0; i < width * width; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentBoard[i]?.value;
      const isBlank = currentBoard[i]?.value === "";

      if (i % width < width - 3) {
        // Ensure it fits in the row
        if (
          rowOfFour.every(
            (i) => currentBoard[i]?.value === decidedColor && !isBlank
          )
        ) {
          // Create a bonus candy based on the matched color
          const bonusCandy = candyColors.find(
            (candy) => candy.value === String(decidedColor) && candy.bonus
          );
          if (bonusCandy) {
            currentBoard[i] = bonusCandy;
          }
          // Clear the rest of the matched candies
          rowOfFour
            .slice(1)
            .forEach(
              (i) => (currentBoard[i] = { value: "", color: "", bonus: false })
            );
          isMatchFound = true;
        }
      }
    }

    // Vertical matches of 4
    for (let i = 0; i < width * (width - 3); i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentBoard[i]?.value;
      const isBlank = currentBoard[i]?.value === "";
      if (i % width < width - 3) {
        if (
          columnOfFour.every(
            (i) => currentBoard[i]?.value === decidedColor && !isBlank
          )
        ) {
          const bonusCandy = candyColors.find(
            (candy) => candy.value === String(decidedColor) && candy.bonus
          );
          if (bonusCandy) {
            currentBoard[i] = bonusCandy;
          }
          // Clear the rest of the matched candies
          columnOfFour
            .slice(1)
            .forEach(
              (i) => (currentBoard[i] = { value: "", color: "", bonus: false })
            );
          isMatchFound = true;
        }
      }
    }

    setCurrentBoard([...currentBoard]); // Trigger a re-render
    return isMatchFound;
  };

  // Move candies down after matches are found
  const moveCandiesDown = () => {
    for (let i = 0; i < width * (width - 1); i++) {
      if (currentBoard[i + width]?.value === "") {
        currentBoard[i + width] = currentBoard[i];
        currentBoard[i] = { value: "", color: "", bonus: false };
      }
    }
 
 // Refill top row with new candies
    for (let i = 0; i < width; i++) {
      if (currentBoard[i]?.value === "") {
        currentBoard[i] = candyColors.filter((item) => !item.bonus)[
          Math.floor((Math.random() * candyColors.length) / 2)
        ];
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
      const originalFirstCell = firstCell;
      setSecondCell(i);
      // Store candies before swapping
      const firstCandy = { ...currentBoard[originalFirstCell] };
      let secondCandy = { ...currentBoard[i] };

      // Perform the swap
      currentBoard[originalFirstCell] = secondCandy;
      currentBoard[i] = firstCandy;

      setFirstCell(null);
      const isMatch = checkForMatches4() || checkForMatches();
      console.log(isMatch);

      // If no match is found, revert the swap
      if (!isMatch) {
        setTimeout(() => {
          currentBoard[originalFirstCell] = firstCandy;
          currentBoard[i] = secondCandy;
          setCurrentBoard([...currentBoard]);
        }, 200);
      } else {
        setCurrentBoard([...currentBoard]);
      }
      setFirstCell(null);
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
            {currentBoard.map((candy, i) => (
              <div
                key={i}
                style={{
                  backgroundImage: `url(${candy.color})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  border:
                    firstCell === i
                      ? "3px solid #000"
                      : secondCell === i
                      ? "3px solid #f00"
                      : "none",
                }}
                className="candy-tile "
                data-id={i}
                onClick={() => Click(i)}
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
