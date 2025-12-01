//

export interface UserStats{
    power: number;
	technique: number;
	accuracy: number;
}

export interface UserData{
	name: string;
	clearedStages: number;
	stats: UserStats;
}

const DEFAULT_STATS = {
	power: 1,
	technique: 1,
	accuracy: 1
};

export function loadUserDB(): Record<string, UserData> {
	const raw = localStorage.getItem("userDB");
	return raw ? JSON.parse(raw) : {};
}

export function saveUserDB(db: Record<string, UserData>) {
	localStorage.setItem("userDB", JSON.stringify(db));
}

export function getOrCreateUser(name: string): UserData {
	const db = loadUserDB();

	if (db[name]) {
		return db[name];
	}

	// new user
	const newUser: UserData = {
		name,
		clearedStages: 0,
		stats: { ...DEFAULT_STATS }
	};

	db[name] = newUser;
	saveUserDB(db);

	return newUser;
}

// update user data
export function updateUser(user: UserData) {
	const db = loadUserDB();
	db[user.name] = user;
	saveUserDB(db);
}


export function setCurrentUser(name: string) {
	localStorage.setItem("currentUser", name);
}

export function getCurrentUserName(): string | null {
	return localStorage.getItem("currentUser");
}
