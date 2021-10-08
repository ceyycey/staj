import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import routes from './routes/posts';

const router: Express = express();

/** giriş */
router.use(morgan('dev'));
/** İsteği ayrıştır */
router.use(express.urlencoded({ extended: false }));
/** JSON verileriyle ilgilenir */
router.use(express.json());

/** API KURALIMIZ */
router.use((req, res, next) => {
    // CORS politikasını ayarla
    res.header('Access-Control-Allow-Origin', '*');
    // CORS başlıklarını ayarla
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // CORS yöntemi başlıklarını ayarla
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

/** Rotalar */
router.use('/', routes);

/** Hata yönetimi */
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/** sunucu */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 6060;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));