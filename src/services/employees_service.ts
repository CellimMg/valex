import * as employeeRepository from "../repositories/employee_repository";

export async function getEmployeeById(employeeId: number) {
    const employee = await employeeRepository.findById(employeeId);

    if (!employee) throw "EMPLOYEE_NOT_FOUND";

    return employee;
}