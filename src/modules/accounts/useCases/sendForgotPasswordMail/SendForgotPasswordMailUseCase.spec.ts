import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/date-provider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/mail-provider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

describe("Sendo forgot mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();
    dateProvider = new DayjsDateProvider();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendmail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      name: "Catherine Ramirez",
      email: "jielmom@ib.to",
      driver_license: "7875910974",
      password: "102030",
    });

    await sendForgotPasswordMailUseCase.execute("jielmom@ib.to");

    expect(sendmail).toHaveBeenCalled();
  });

  it("should not be able to send an mail if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("lobece@coguvi.ro")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("should be able to create an users token", async () => {
    const createToken = jest.spyOn(usersTokensRepositoryInMemory, "create");

    await usersRepositoryInMemory.create({
      name: "Christine Harris",
      email: "juheksec@dogupwah.tp",
      driver_license: "1677",
      password: "102030",
    });

    await sendForgotPasswordMailUseCase.execute("juheksec@dogupwah.tp");

    expect(createToken).toBeCalled();
  });
});
