jest.mock("../../repositories/machine.repo", () => ({
  getAll: jest.fn()
}))

import { CustomError } from "../../middlewares/errorHandler"
import { getAll } from "../../repositories/machine.repo"
import { getAllMachines } from "../../services/machine.service"
import { mockGetAll } from "../../test_utils/__mock__/mockMachineData"

describe("get all machines", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should return an array of existing data", async () => {
    (getAll as jest.Mock).mockResolvedValue(mockGetAll)

    const data = await getAllMachines()

    expect(data).toBe(mockGetAll)
  })

  it("should throw a custom error if no data is returned", async () => {
    (getAll as jest.Mock).mockResolvedValue([])

    await expect(getAllMachines()).rejects.toThrow(CustomError)
    await expect(getAllMachines()).rejects.toMatchObject({
      message: "No se han encontrado máquinas",
      statusCode: 404,
      errors: ["No se han encontrado máquinas"]
    })
  })
})