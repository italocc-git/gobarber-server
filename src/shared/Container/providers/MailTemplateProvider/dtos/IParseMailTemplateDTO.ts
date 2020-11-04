interface ITemplateVariables{
    [key:string] : string | number; /* dinamic object */
}

export default interface IParseMailTemplateDTO{
    file: string;
    variables: ITemplateVariables
}
