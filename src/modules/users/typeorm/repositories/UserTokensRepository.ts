import { EntityRepository, Repository } from "typeorm";
import User from "../entities/User";
import UserTokens from "../entities/UserTokens";

@EntityRepository(UserTokens)
export default class UserTokensRepotiory extends Repository<UserTokens> {

    public async findByToken(token: string): Promise<UserTokens | undefined>{
        const userTokens = await this.findOne({
            where: {
                token,
            }
        })
        return userTokens;
    }

}