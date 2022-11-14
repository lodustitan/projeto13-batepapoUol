import dayjs from 'dayjs';
import { repository } from '../repository/repository';

export class UpdateController {
    async deleteAFKusers(){
        const query = await repository.getAllParticipant();
        query.forEach(async element => {
            const bet = dayjs().diff(element.lastStatus, 'second');
            if(bet > 10){
                await repository.addMessage(element.name, "sai da sala...", "status");
                await repository.removeParticipant(element._id);
            }
        });
    }
}