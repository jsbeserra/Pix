import ICreateCode from '@application/interfaces/create-code'
import {v4} from 'uuid'

export default class UuidApter implements ICreateCode {

	createCode(): string {
		return v4()
	}

}