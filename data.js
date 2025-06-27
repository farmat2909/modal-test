const MOCK_VENUES = [
    { id: 1, region: 'Абхазия', city: 'г Сухум', timezone: 'MSK+0 (UTC+3)', name: 'Абхазская государственная филармония имени Р.Д. Гумба', address: 'Сухум, проспект Леона, 18', isTypical: false },
    { id: 2, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: 'HAIRY LEMON PUB', address: 'г Барнаул, ул Лазурная, д 13', isTypical: true },
    { id: 3, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: 'HARATS PUB', address: 'г Барнаул, Красноармейский пр-кт, д 73А', isTypical: true },
    { id: 4, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: 'LIL BRAZIL', address: 'г Барнаул, Красноармейский пр-кт, д 47А', isTypical: true },
    { id: 5, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: 'StandUp Altai club', address: 'г Барнаул, ул Молодежная, д 25Б', isTypical: true },
    { id: 6, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: 'Urban', address: 'Барнаул, ул. 65 лет Победы, 20', isTypical: true },
    { id: 7, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: '«Барнаул Цирк Моретти»', address: 'г Барнаул, пр-кт Строителей, д 117', isTypical: false },
    { id: 8, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: 'АЛТАЙСКИЙ ГОСУДАРСТВЕННЫЙ ИНСТИТУТ КУЛЬТУРЫ', address: 'г. Барнаул, ул. Юрина, д. 277', isTypical: false },
    { id: 9, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: 'АЛТАЙСКИЙ ГОСУДАРСТВЕННЫЙ ИНСТИТУТ КУЛЬТУРЫ (учебный корпус №3)', address: 'г Барнаул, пр-кт Ленина, д 66', isTypical: false },
    { id: 10, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: 'Алтайский государственный краеведческий музей', address: 'г Барнаул, ул Ползунова, д 39', isTypical: false },
    { id: 11, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: 'Алтайский государственный краеведческий музей', address: 'г Барнаул, Красноармейский пр-кт, д 28', isTypical: false },
    { id: 12, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: 'Алтайский государственный музыкальный театр', address: 'г Барнаул, Комсомольский пр-кт, д 108', isTypical: false },
    { id: 13, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: 'Алтайский государственный педагогический университет, историко-краеведческий музей', address: 'г Барнаул, ул Молодежная, д 55', isTypical: false },
    { id: 14, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: 'Алтайский государственный педагогический университет, Музей истории образования им. П.П. Костенкова', address: 'г Барнаул, Социалистический пр-кт, д 126', isTypical: false },
    { id: 15, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: 'Алтайский государственный театр кукол Сказка', address: 'г. Барнаул, ул. Пушкина, д. 41', isTypical: false },
    { id: 16, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: 'Барнаул Цирк Моретти', address: 'г Барнаул, пр-кт Строителей, д 117', isTypical: false },
    { id: 17, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: 'Барнаул Цирк Моретти', address: 'г Барнаул, ул Власихинская, д 67', isTypical: false },
    { id: 18, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: 'Водный театр "Нерпинарий"', address: 'г. Барнаул, Георгия Исакова, 149а к7 (на территории "Арлекино парк")', isTypical: false },
    { id: 19, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: 'Горная Аптека, музей аптечного дела', address: 'г Барнаул, ул Ползунова, д 42', isTypical: false },
    { id: 20, region: 'Алтайский край', city: 'г Барнаул', timezone: 'MSK+4 (UTC+7)', name: 'Государственная филармония Алтайского края', address: 'г. Барнаул, ул. Ползунова, 35', isTypical: false },
];

export function generateVenueData(count) {
    const generatedData = [];
    for (let i = 0; i < count; i++) {
        const template = MOCK_VENUES[i % MOCK_VENUES.length];
        generatedData.push({
            ...template,
            id: i + 1,
            name: `${template.name} #${Math.floor(i / MOCK_VENUES.length) + 1}`,
            isTypical: Math.random() > 0.5,
        });
    }
    return generatedData;
}

export function generateSchemeData(count) {
    return Array.from({ length: count }, (_, i) => {
        const id = i + 1;
        const totalSectors = Math.floor(Math.random() * 4) + 1;
        const totalSeats = Math.floor(Math.random() * 2000) + 500;
        const unnumberedSectors = totalSectors;
        const unnumberedSeats = totalSeats;

        return {
            id,
            hallName: '',
            name: `Схема зала ${id}`,
            totalSectors,
            totalSeats,
            numberedSectors: 0,
            numberedSeats: 0,
            unnumberedSectors,
            unnumberedSeats,
            usageCount: Math.floor(Math.random() * 5),
            isPersonal: Math.random() > 0.3,
        };
    });
}