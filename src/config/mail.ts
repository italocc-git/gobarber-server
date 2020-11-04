interface IMailConfig {
    driver: 'ethereal' | 'ses';

    defaults : {
        from: {
            email: string;
            name: string;
        }
    }
}
export default {
    driver: process.env.MAIL_DRIVER || 'ethereal',

    defaults :{
        from :{
            email: 'italocc16@gmail.com',
            name: 'Italo da Mombascity'
        }
    }
} as IMailConfig
