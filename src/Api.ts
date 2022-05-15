import axios from "axios";

class Api {
    public async initGame(publicKey: string, invitePublicKey: string) {
        return axios.post('https://tic-tac-toe-api.jozhe.com/init_game', {pubkey: publicKey, invitepubkey: invitePublicKey});
    }

    public async joinGame(gameId: string, publicKey: string) {
        return axios.post('https://tic-tac-toe-api.jozhe.com/accept_invite', {game_id: gameId, pubkey: publicKey});
    }

    public async makeMove(gameId: string, publicKey: string, position: number) {
        return axios.post('https://tic-tac-toe-api.jozhe.com/move', {game_id: gameId, pubkey: publicKey, position});
    }

    public async getGameState() {
        return axios.get('https://tic-tac-toe-api.jozhe.com/get_db');
    }
}

export default Api
