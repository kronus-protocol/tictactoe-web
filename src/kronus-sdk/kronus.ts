export type Kronus = {
  "version": "0.1.0",
  "name": "kronus",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [],
      "args": []
    },
    {
      "name": "initializeGame",
      "accounts": [
        {
          "name": "playerOne",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "playerOneSingingKey",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "playerTwo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "game",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "uuid",
          "type": "string"
        }
      ]
    },
    {
      "name": "acceptGame",
      "accounts": [
        {
          "name": "playerTwo",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "playerTwoSingingKey",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "game",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "nonce",
          "type": "i64"
        }
      ]
    },
    {
      "name": "makeMove",
      "accounts": [
        {
          "name": "playerSinger",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "player",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "game",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "moveIndex",
          "type": "u32"
        },
        {
          "name": "nonce",
          "type": "i64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "game",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "playerOneKey",
            "type": "publicKey"
          },
          {
            "name": "playerTwoKey",
            "type": "publicKey"
          },
          {
            "name": "playerOneSingingKey",
            "type": "publicKey"
          },
          {
            "name": "playerTwoSingingKey",
            "type": "publicKey"
          },
          {
            "name": "lastTimestamp",
            "type": "i64"
          },
          {
            "name": "moves",
            "type": {
              "vec": {
                "defined": "Move"
              }
            }
          },
          {
            "name": "gameStatus",
            "type": {
              "defined": "GameStatus"
            }
          },
          {
            "name": "gameOutcome",
            "type": {
              "defined": "GameOutcome"
            }
          },
          {
            "name": "gamePlayTurn",
            "type": {
              "defined": "GamePlayTurn"
            }
          },
          {
            "name": "gameEndTime",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Move",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "playerKey",
            "type": "publicKey"
          },
          {
            "name": "moveIndex",
            "type": "u32"
          },
          {
            "name": "gamePlayTurn",
            "type": {
              "defined": "GamePlayTurn"
            }
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "GameStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "None"
          },
          {
            "name": "PlayerOneStarted"
          },
          {
            "name": "PlayerTwoStarted"
          },
          {
            "name": "GameInProgress"
          },
          {
            "name": "GameEnded"
          }
        ]
      }
    },
    {
      "name": "GameOutcome",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "None"
          },
          {
            "name": "PlayerOneWinner"
          },
          {
            "name": "PlayerTwoWinner"
          },
          {
            "name": "GameDraw"
          }
        ]
      }
    },
    {
      "name": "GamePlayTurn",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "None"
          },
          {
            "name": "PlayerOne"
          },
          {
            "name": "PayerTwo"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidAction",
      "msg": "Invalid action"
    },
    {
      "code": 6001,
      "name": "InvalidPlayer",
      "msg": "Invalid player"
    },
    {
      "code": 6002,
      "name": "InvalidPlayerSinger",
      "msg": "Invalid player singer"
    },
    {
      "code": 6003,
      "name": "GameEnded",
      "msg": "Game ended"
    },
    {
      "code": 6004,
      "name": "GameTimeOver",
      "msg": "Game time over"
    },
    {
      "code": 6005,
      "name": "InvalidNonce",
      "msg": "Invalid nonce"
    },
    {
      "code": 6006,
      "name": "InvalidMove",
      "msg": "Invalid move"
    },
    {
      "code": 6007,
      "name": "MoveAlreadyMake",
      "msg": "Move already make"
    }
  ]
};

export const IDL: Kronus = {
  "version": "0.1.0",
  "name": "kronus",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [],
      "args": []
    },
    {
      "name": "initializeGame",
      "accounts": [
        {
          "name": "playerOne",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "playerOneSingingKey",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "playerTwo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "game",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "uuid",
          "type": "string"
        }
      ]
    },
    {
      "name": "acceptGame",
      "accounts": [
        {
          "name": "playerTwo",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "playerTwoSingingKey",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "game",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "nonce",
          "type": "i64"
        }
      ]
    },
    {
      "name": "makeMove",
      "accounts": [
        {
          "name": "playerSinger",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "player",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "game",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "moveIndex",
          "type": "u32"
        },
        {
          "name": "nonce",
          "type": "i64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "game",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "playerOneKey",
            "type": "publicKey"
          },
          {
            "name": "playerTwoKey",
            "type": "publicKey"
          },
          {
            "name": "playerOneSingingKey",
            "type": "publicKey"
          },
          {
            "name": "playerTwoSingingKey",
            "type": "publicKey"
          },
          {
            "name": "lastTimestamp",
            "type": "i64"
          },
          {
            "name": "moves",
            "type": {
              "vec": {
                "defined": "Move"
              }
            }
          },
          {
            "name": "gameStatus",
            "type": {
              "defined": "GameStatus"
            }
          },
          {
            "name": "gameOutcome",
            "type": {
              "defined": "GameOutcome"
            }
          },
          {
            "name": "gamePlayTurn",
            "type": {
              "defined": "GamePlayTurn"
            }
          },
          {
            "name": "gameEndTime",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Move",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "playerKey",
            "type": "publicKey"
          },
          {
            "name": "moveIndex",
            "type": "u32"
          },
          {
            "name": "gamePlayTurn",
            "type": {
              "defined": "GamePlayTurn"
            }
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "GameStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "None"
          },
          {
            "name": "PlayerOneStarted"
          },
          {
            "name": "PlayerTwoStarted"
          },
          {
            "name": "GameInProgress"
          },
          {
            "name": "GameEnded"
          }
        ]
      }
    },
    {
      "name": "GameOutcome",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "None"
          },
          {
            "name": "PlayerOneWinner"
          },
          {
            "name": "PlayerTwoWinner"
          },
          {
            "name": "GameDraw"
          }
        ]
      }
    },
    {
      "name": "GamePlayTurn",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "None"
          },
          {
            "name": "PlayerOne"
          },
          {
            "name": "PayerTwo"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidAction",
      "msg": "Invalid action"
    },
    {
      "code": 6001,
      "name": "InvalidPlayer",
      "msg": "Invalid player"
    },
    {
      "code": 6002,
      "name": "InvalidPlayerSinger",
      "msg": "Invalid player singer"
    },
    {
      "code": 6003,
      "name": "GameEnded",
      "msg": "Game ended"
    },
    {
      "code": 6004,
      "name": "GameTimeOver",
      "msg": "Game time over"
    },
    {
      "code": 6005,
      "name": "InvalidNonce",
      "msg": "Invalid nonce"
    },
    {
      "code": 6006,
      "name": "InvalidMove",
      "msg": "Invalid move"
    },
    {
      "code": 6007,
      "name": "MoveAlreadyMake",
      "msg": "Move already make"
    }
  ]
};
