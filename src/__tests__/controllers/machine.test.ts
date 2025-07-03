import { MachineController } from "../../controllers/machine.controller"
import { mockNext, mockRequest, mockResponse } from "../../test_utils/__mock__/mockHelpers"
import { createMachine, getAllMachines } from "../../services/machine.service"
import { CustomError } from "../../middlewares/errorHandler"

jest.mock("../../services/machine.service")

describe("get machines", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should return machines with status 200", async () => {
    const mockMachines = [{ "name": "Running machine", "description": "Machine to run", "id": 1 }];
    (getAllMachines as jest.Mock).mockResolvedValue(mockMachines)

    const machineController = new MachineController()

    await machineController.getMachines(mockRequest, mockResponse, mockNext)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.send).toHaveBeenCalledWith(mockMachines)
  })

  it("should return error message if no machines are found", async () => {
    const customError = new CustomError("No se han encontrado máquinas", 404, ["No se han encontrado máquinas"]);
    (getAllMachines as jest.Mock).mockRejectedValue(customError)

    const machineController = new MachineController()
    const next = jest.fn()

    await machineController.getMachines(mockRequest, mockResponse, next)

    expect(next).toHaveBeenCalledWith(customError)
  })

  it("should return internal server error to any other error", async () => {
    const unexpectedError = new Error("Internal server error");
    (getAllMachines as jest.Mock).mockRejectedValue(unexpectedError)

    const machineController = new MachineController()
    const next = jest.fn()

    await machineController.getMachines(mockRequest, mockResponse, next)

    expect(next).toHaveBeenCalledWith(unexpectedError)
    
  })
})

describe("create machines", () => {
  it("should create a machine and return 201 status code", async () => {
    const mockResult = { name: "Run machine", description: "machine to run", id: 1 };
    (createMachine as jest.Mock).mockResolvedValue(mockResult)

    const machineController = new MachineController()
    const next = jest.fn()

    await machineController.createMachine(mockRequest, mockResponse, next)

    expect(mockResponse.status).toHaveBeenCalledWith(201)
    expect(mockResponse.send).toHaveBeenCalledWith(mockResult)
  })

  it("should return validation error if parsed data throws error", async () => {
    const validationError = new CustomError("Error de validación", 400, ["Name is required"]);
    (createMachine as jest.Mock).mockRejectedValue(validationError)

    const machineController = new MachineController()
    const next = jest.fn()

    await machineController.createMachine(mockRequest, mockResponse, next)

    expect(next).toHaveBeenCalledWith(validationError)
  })

  it("should return internal server error if unexpected error appears", async () => {
    const unexpectedError = new Error("Internal server error");
    (createMachine as jest.Mock).mockRejectedValue(unexpectedError)

    const machineController = new MachineController()
    const next = jest.fn()

    await machineController.createMachine(mockRequest, mockResponse, next)

    expect(next).toHaveBeenCalledWith(unexpectedError)
  })
})