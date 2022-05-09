import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath} from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url))

const file = join(__dirname, '../../database/db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

db.read()

export default {
	dbread : async function(){
		await db.read();
	},
	dbwrite : async function(){
		await db.write();
	},
	db : function(){
		return db;
	}
}