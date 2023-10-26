import IPixKeyRepository from '@application/interfaces/data/repository/pix-key-repository'
import PixKey from '@domain/value-objects/pix-key'
import ITypeOrmAdpter from '@main/data-base/typeorm/itypeorm-adpter'

export default class PixKeyRepositoryTypeOrm implements IPixKeyRepository {

	constructor(readonly typeormAdpter:ITypeOrmAdpter){
	}

	async remove(cpf: string): Promise<void> {
		throw new Error('Method not implemented.')
	}

	async save(pixKey: string, accountId: string): Promise<void> {
		const key = this.typeormAdpter.getPixKeyEntity().create({
			pix_key:pixKey,
			account_id:accountId
		})
		await this.typeormAdpter.getPixKeyEntity().save(key)
	}

	async get(pixKey: string): Promise<PixKey | undefined> {
		console.log('teste')
		const key = await this.typeormAdpter.getPixKeyEntity().findOneBy({pix_key:pixKey})
		if (!key) return
		return PixKey.restore(key.pix_key)
	}
    
}