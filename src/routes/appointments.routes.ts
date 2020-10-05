import {Router} from 'express'
import {parseISO } from 'date-fns'
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import CreateAppontmentService from '../services/CreateAppointmentService'
import { getCustomRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
const appointmentsRouter = Router();


/* Observação : FUnção da ROTA
A rota : Recebe a requisição, chama outro arquivo(classe,algum procedimento) e devolve a resposta */

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/', async (request,response) => {
    const appointmentRepository = getCustomRepository(AppointmentsRepository)
    const appointments = await appointmentRepository.find();
    return response.json(appointments)
})

// http://localhost:3333/appointments
appointmentsRouter.post('/', async(request,response) => {


        const { provider_id, date } = request.body;

        const parseDate = parseISO(date)

        const createAppointment = new CreateAppontmentService();

        const appointment = await createAppointment.execute({date:parseDate , provider_id})

        return response.json(appointment);


      });


export default appointmentsRouter;
