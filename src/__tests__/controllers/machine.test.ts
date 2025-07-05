import { MachineController } from "../../controllers/machine.controller"
import { mockRequest, mockResponse } from "../../test_utils/__mock__/mockHelpers"
import { createMachine, deleteMachine, getAllMachines, updateMachine } from "../../services/machine.service"
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
    const next = jest.fn()

    await machineController.getMachines(mockRequest, mockResponse, next)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.send).toHaveBeenCalledWith(mockMachines)
    expect(next).not.toHaveBeenCalled()
  })

  it("should return error message if no machines are found", async () => {
    const customError = new CustomError("No se han encontrado máquinas", 404, ["No se han encontrado máquinas"]);
    (getAllMachines as jest.Mock).mockRejectedValue(customError)

    const machineController = new MachineController()
    const next = jest.fn()

    await machineController.getMachines(mockRequest, mockResponse, next)

    expect(next).toHaveBeenCalledWith(customError)
    expect(next.mock.calls[0][0].statusCode).toBe(404)
    expect(next.mock.calls[0][0].message).toBe("No se han encontrado máquinas")
  })

  it("should return internal server error to any other error", async () => {
    const unexpectedError = new Error("Internal server error");
    (getAllMachines as jest.Mock).mockRejectedValue(unexpectedError)

    const machineController = new MachineController()
    const next = jest.fn()

    await machineController.getMachines(mockRequest, mockResponse, next)

    expect(next).toHaveBeenCalledWith(unexpectedError)
    expect(next.mock.calls[0][0].statusCode).toBe(500)
    expect(next.mock.calls[0][0].message).toBe("Internal server error")
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
    expect(next).not.toHaveBeenCalled()
  })

  it("should return validation error if parsed data throws error", async () => {
    const validationError = new CustomError("Error de validación", 400, ["Name is required"]);
    (createMachine as jest.Mock).mockRejectedValue(validationError)

    const machineController = new MachineController()
    const next = jest.fn()

    await machineController.createMachine(mockRequest, mockResponse, next)

    expect(next).toHaveBeenCalledWith(validationError)
    expect(next.mock.calls[0][0].statusCode).toBe(400)
    expect(next.mock.calls[0][0].message).toBe("Error de validación")
  })

  it("should return internal server error if unexpected error appears", async () => {
    const unexpectedError = new Error("Internal server error");
    (createMachine as jest.Mock).mockRejectedValue(unexpectedError)

    const machineController = new MachineController()
    const next = jest.fn()

    await machineController.createMachine(mockRequest, mockResponse, next)

    expect(next).toHaveBeenCalledWith(unexpectedError)
    expect(next.mock.calls[0][0].statusCode).toBe(500)
    expect(next.mock.calls[0][0].message).toBe("Internal server error")
  })
})

describe("update machine", () => {
  it("should return 204 and no content", async () => {
    (updateMachine as jest.Mock).mockResolvedValue({})

    const machineController = new MachineController()

    const req = {
      ...mockRequest,
      body: { name: "new name" },
      params: { id: "6866a269dd63a07f2b8fb2bb" }
    }

    const next = jest.fn()

    await machineController.updateMachine(req as any, mockResponse, next)

    expect(mockResponse.status).toHaveBeenCalledWith(204)
    expect(mockResponse.send).toHaveBeenCalled()
    expect(next).not.toHaveBeenCalled()
  })

  it("should return error 400 when passing invalid id", async () => {
    const customError = new CustomError("Id inválida", 400, ["Id inválida"]);
    (updateMachine as jest.Mock).mockRejectedValue(customError)

    const machineController = new MachineController()
    const next = jest.fn()

    await machineController.updateMachine(mockRequest, mockResponse, next)

    expect(next).toHaveBeenCalledWith(customError)
    expect(next.mock.calls[0][0].statusCode).toBe(400)
    expect(next.mock.calls[0][0].message).toBe("Id inválida")
  })

  it("should return error 404 when no machine matchs the id", async () => {
    const customError = new CustomError("Máquina no encontrada", 404, ["Máquina no encontrada"]);
    (updateMachine as jest.Mock).mockRejectedValue(customError)

    const machineController = new MachineController()
    const next = jest.fn()

    await machineController.updateMachine(mockRequest, mockResponse, next)

    expect(next).toHaveBeenCalledWith(customError)
    expect(next.mock.calls[0][0].statusCode).toBe(404)
    expect(next.mock.calls[0][0].message).toBe("Máquina no encontrada")
  })

  it("should return error 400 when passing invalid data", async () => {
    const customError = new CustomError("Error de validación", 400, []);
    (updateMachine as jest.Mock).mockRejectedValue(customError)

    const machineController = new MachineController()
    const next = jest.fn()

    await machineController.updateMachine(mockRequest, mockResponse, next)

    expect(next).toHaveBeenCalledWith(customError)
    expect(next.mock.calls[0][0].statusCode).toBe(400)
    expect(next.mock.calls[0][0].message).toBe("Error de validación")
  })

  it("should return internal server error to any other error", async () => {
    const error = new Error("Internal server error");
    (updateMachine as jest.Mock).mockRejectedValue(error)

    const machineController = new MachineController()
    const next = jest.fn()

    await machineController.updateMachine(mockRequest, mockResponse, next)

    expect(next).toHaveBeenCalledWith(error)
    expect(next.mock.calls[0][0].statusCode).toBe(500)
    expect(next.mock.calls[0][0].message).toBe("Internal server error")
  })
})

describe("delete machine", () => {
  it("returns 204 and no content", async () => {
    (deleteMachine as jest.Mock).mockResolvedValue({})

    const machineController = new MachineController()
    const next = jest.fn()

    await machineController.deleteMachine(mockRequest, mockResponse, next)

    expect(mockResponse.status).toHaveBeenCalledWith(204)
    expect(mockResponse.send).toHaveBeenCalled()
    expect(next).not.toHaveBeenCalled()
  })

  it("should return error 400 when invalid id", async () => {
    const customError = new CustomError("Id inválida", 400, ["Id inválida"]);
    (deleteMachine as jest.Mock).mockRejectedValue(customError)

    const machineController = new MachineController()
    const next = jest.fn()

    await machineController.deleteMachine(mockRequest, mockResponse, next)

    expect(next).toHaveBeenCalledWith(customError)
    expect(next.mock.calls[0][0].statusCode).toBe(400)
    expect(next.mock.calls[0][0].message).toBe("Id inválida")
  })

  it("should return error 400 when machine not found", async () => {
    const customError = new CustomError("Máquina no encontrada", 400, ["Máquina no encontrada"]);
    (deleteMachine as jest.Mock).mockRejectedValue(customError)

    const machineController = new MachineController()
    const next = jest.fn()

    await machineController.deleteMachine(mockRequest, mockResponse, next)

    expect(next).toHaveBeenCalledWith(customError)
    expect(next.mock.calls[0][0].statusCode).toBe(400)
    expect(next.mock.calls[0][0].message).toBe("Máquina no encontrada")
  })

  it("should return internal server error to any other error", async () => {
    const error = new Error("Internal server error");
    (deleteMachine as jest.Mock).mockRejectedValue(error)

    const machineController = new MachineController()
    const next = jest.fn()

    await machineController.deleteMachine(mockRequest, mockResponse, next)

    expect(next).toHaveBeenCalledWith(error)
    expect(next.mock.calls[0][0].statusCode).toBe(500)
    expect(next.mock.calls[0][0].message).toBe("Internal server error")
  })
})