import * as companyRepository from "../repositories/company_repository";

export async function verifyCompanyByKey(apiKey: string) {
    const company = await companyRepository.findByApiKey(apiKey);
    if (!company) throw "COMPANY_NOT_FOUND";
}