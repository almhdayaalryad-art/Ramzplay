/*
 * ============================================================
 * Ramzplay - متجر التطبيقات
 * جميع الحقوق محفوظة للمهندس رمزي الصلاحي © 2026
 * ============================================================
 * الملف المشترك الأساسي (common.js) - النسخة النهائية
 * يحتوي على: إدارة البيانات، التخزين المحلي، دوال عرض الموقع،
 * دوال لوحة التحكم، دوال الكاروسيل، الإعلانات، الأقسام، التطبيقات،
 * رسائل الاتصال، عداد الزوار، إعدادات القائمة، الشركاء، التحديثات.
 * ============================================================
 */

// =====================================================
// ============ تهيئة Supabase (متغيرات الاتصال) ============
// =====================================================
// 🔑 تم تحديث القيم لتطابق مشروعك الفعلي
const SUPABASE_URL = 'https://vpwqitvprtbwtgeuwjcs.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_A4eX9dRgVi13wUum2cVtWw_X_VdMpLb';
const STORAGE_BUCKET = 'ramzplay'; // اسم bucket الصور والملفات

let supabaseClient = null;
if (typeof supabase !== 'undefined' && supabase.createClient) {
    try {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('✅ Supabase client initialized successfully');
        console.log('🔗 Connected to:', SUPABASE_URL);
        console.log('📁 Storage bucket:', STORAGE_BUCKET);
    } catch (e) {
        console.warn('⚠️ Supabase initialization failed:', e);
    }
}

// =====================================================
// ============ البيانات الافتراضية ============
// =====================================================
const DEFAULT_DATA = {
    settings: {
        logoIcon: 'fa-gamepad',
        logoText1: 'Ramz',
        logoText2: 'play',
        appName: 'Ramzplay',
        footerText: '© 2026 Ramzplay – جميع الحقوق محفوظة للمهندس رمزي الصلاحي',
        currency: 'SAR',
        language: 'ar',
        showSaudiFlag: true,
        cartEnabled: true,
        enableUserProfile: true,
        contactEmail: 'info@ramzplay.com',
        whatsappNumber: '966500000000',
        trackingCode: '',
        visitorCount: 0,
        blogPosts: [],
        logoImage: '',
        menuSettings: {
            enableUserIcon: true,
            enableCartIcon: true,
            whatsappOrders: '+966500000000',
            emailOrders: 'orders@ramzplay.com',
            enableInAppChat: false
        },
        paymentSettings: {
            enabled: false,
            gateway: 'simulated',
            publicKey: '',
            secretKey: '',
            currency: 'SAR',
            taxRate: 0,
            shippingFee: 0,
            googleMerchantId: '',
            googleGatewayId: ''
        },
        westernUnion: {
            enabled: false,
            receiver: 'Ramzplay Store',
            country: 'السعودية',
            city: 'الرياض'
        }
    },
    categories: [
        { id: 'cat1', name: 'ألعاب', slug: 'games', icon: 'fas fa-gamepad', color: '#4CAF50', featuredImage: '', showInIndex: true, indexOrder: 0 },
        { id: 'cat2', name: 'تواصل اجتماعي', slug: 'social', icon: 'fas fa-users', color: '#3b82f6', featuredImage: '', showInIndex: true, indexOrder: 1 },
        { id: 'cat3', name: 'إنتاجية', slug: 'productivity', icon: 'fas fa-briefcase', color: '#f59e0b', featuredImage: '', showInIndex: true, indexOrder: 2 }
    ],
    stores: {
        'cat1': [
            { id: 'store1', name: 'GameZone', category: 'cat1', logo: 'https://placehold.co/100/4CAF50/ffffff?text=GZ', externalUrl: '#', hidden: false, description: 'ألعاب ممتعة', phone: '', address: '', ownerCode: '', allowUpload: false, banners: [], productDisplayMode: 'grid', productDisplayCount: 10, numStrips: 10 },
        ],
        'cat2': [
            { id: 'store2', name: 'Social Hub', category: 'cat2', logo: 'https://placehold.co/100/3b82f6/ffffff?text=SH', externalUrl: '#', hidden: false, description: 'تواصل بسهولة', phone: '', address: '', ownerCode: '', allowUpload: false, banners: [], productDisplayMode: 'grid', productDisplayCount: 10, numStrips: 10 },
        ],
        'cat3': [
            { id: 'store3', name: 'WorkFlow', category: 'cat3', logo: 'https://placehold.co/100/f59e0b/ffffff?text=WF', externalUrl: '#', hidden: false, description: 'إنتاجية عالية', phone: '', address: '', ownerCode: '', allowUpload: false, banners: [], productDisplayMode: 'grid', productDisplayCount: 10, numStrips: 10 },
        ]
    },
    products: {
        'store1': [
            { 
                id: 'prod1', storeId: 'store1', categoryId: 'cat1', name: 'لعبة المغامرات', desc: 'مغامرة مثيرة', 
                image: 'https://placehold.co/300/4CAF50/ffffff?text=Game', appSize: '45 MB', appVersion: '1.2.3', 
                appDownloads: '100K+', appRating: 4.5, appUpdateDate: '2025-01-01', oldPrice: 0, newPrice: 0, 
                link: '#', seoKeywords: 'لعبة, مغامرة', hashtags: ['#ألعاب'], 
                restricted: false, restrictionReason: '', 
                paymentRequired: false, price: 0, paymentType: 'one_time',
                file_url: '', file_type: '', version: 1, downloadCount: 150,
                images: []
            },
            { 
                id: 'prod2', storeId: 'store1', categoryId: 'cat1', name: 'لعبة الألغاز', desc: 'ألغاز شيقة', 
                image: 'https://placehold.co/300/8b5cf6/ffffff?text=Puzzle', appSize: '30 MB', appVersion: '2.0.1', 
                appDownloads: '50K+', appRating: 4.2, appUpdateDate: '2025-02-15', oldPrice: 0, newPrice: 0, 
                link: '#', seoKeywords: 'ألغاز, ذكاء', hashtags: ['#ألغاز'], 
                restricted: false, restrictionReason: '', 
                paymentRequired: false, price: 0, paymentType: 'one_time',
                file_url: '', file_type: '', version: 1, downloadCount: 80,
                images: []
            }
        ],
        'store2': [
            { 
                id: 'prod3', storeId: 'store2', categoryId: 'cat2', name: 'تواصل فوري', desc: 'دردشة ومكالمات', 
                image: 'https://placehold.co/300/3b82f6/ffffff?text=Chat', appSize: '20 MB', appVersion: '3.0.0', 
                appDownloads: '1M+', appRating: 4.8, appUpdateDate: '2025-03-01', oldPrice: 0, newPrice: 0, 
                link: '#', seoKeywords: 'دردشة, مكالمات', hashtags: ['#تواصل'], 
                restricted: false, restrictionReason: '', 
                paymentRequired: false, price: 0, paymentType: 'one_time',
                file_url: '', file_type: '', version: 1, downloadCount: 300,
                images: []
            }
        ],
        'store3': [
            { 
                id: 'prod4', storeId: 'store3', categoryId: 'cat3', name: 'مهامي', desc: 'إدارة المهام اليومية', 
                image: 'https://placehold.co/300/f59e0b/ffffff?text=Tasks', appSize: '15 MB', appVersion: '1.0.0', 
                appDownloads: '10K+', appRating: 4.0, appUpdateDate: '2025-04-10', oldPrice: 0, newPrice: 0, 
                link: '#', seoKeywords: 'مهام, إنتاجية', hashtags: ['#إنتاجية'], 
                restricted: false, restrictionReason: '', 
                paymentRequired: false, price: 0, paymentType: 'one_time',
                file_url: '', file_type: '', version: 1, downloadCount: 40,
                images: []
            }
        ]
    },
    carousel: [
        { id: 'car1', name: 'إعلان 1', link: '#', image: 'https://placehold.co/800x300/4CAF50/ffffff?text=Ramzplay+1', order: 0, active: true },
        { id: 'car2', name: 'إعلان 2', link: '#', image: 'https://placehold.co/800x300/3b82f6/ffffff?text=Ramzplay+2', order: 1, active: true }
    ],
    marquee: [
        { name: 'تطبيق 1', icon: 'https://placehold.co/64/4CAF50/ffffff?text=1', link: '#' },
        { name: 'تطبيق 2', icon: 'https://placehold.co/64/3b82f6/ffffff?text=2', link: '#' },
        { name: 'تطبيق 3', icon: 'https://placehold.co/64/f59e0b/ffffff?text=3', link: '#' }
    ],
    testimonials: [
        { id: 't1', name: 'أحمد', image: 'https://placehold.co/100/e2e8f0/94a3b8?text=A', rating: 5, review: 'تطبيق رائع جداً!' },
        { id: 't2', name: 'سارة', image: 'https://placehold.co/100/e2e8f0/94a3b8?text=S', rating: 4, review: 'مفيد وسهل الاستخدام' }
    ],
    footer: {
        email: 'info@ramzplay.com',
        phone: '+966500000000',
        whatsapp: '966500000000',
        payments: ['Visa', 'Mastercard', 'Mada'],
        socialMedia: [
            { platform: 'whatsapp', url: 'https://wa.me/966500000000', active: true },
            { platform: 'facebook', url: 'https://facebook.com', active: true },
            { platform: 'twitter', url: 'https://twitter.com', active: true },
            { platform: 'instagram', url: 'https://instagram.com', active: true }
        ],
        links: {
            policy: { text: 'سياسة الخصوصية', external_url: 'privacy.html', use_file: true },
            terms: { text: 'الشروط والأحكام', external_url: 'terms.html', use_file: true },
            about: { text: 'من نحن', external_url: 'about.html', use_file: true },
            contact: { text: 'اتصل بنا', external_url: 'contact.html', use_file: true },
            blog: { text: 'المدونة', external_url: 'blog.html', use_file: true }
        }
    },
    design: {
        categoryBg: 'linear-gradient(145deg, #e8f5e9, #c8e6c9)',
        categoryText: '#2e7d32',
        categoryFontSize: '2rem',
        storeBg: '#ffffff',
        storeText: '#1e293b',
        storeFontSize: '1.3rem',
        productBg: '#ffffff',
        productText: '#1e293b',
        productFontSize: '0.85rem',
        adBg: 'linear-gradient(90deg, #4CAF50, #388E3C)',
        adText: '#ffffff',
        adFontSize: '1.1rem',
        generalFontSize: '1rem'
    },
    adminErrors: [],
    purchasedProducts: [],
    updates: [
        { id: 'u1', title: 'تحديث النظام 1.0', date: '2026-08-01', content: 'تحسينات في الأداء وإصلاح الأخطاء' }
    ],
    partners: [
        { id: 'p1', name: 'شريك 1', logo: 'https://placehold.co/100/4CAF50/ffffff?text=P1', url: '#' }
    ],
    // ===== مصفوفة رسائل الاتصال (جديد) =====
    messages: []
};

// =====================================================
// ============ رمز الدخول الافتراضي ============
// =====================================================
const ADMIN_CODE = '77353';

// =====================================================
// ============ دوال التحميل والحفظ ============
// =====================================================

/**
 * تحميل البيانات من localStorage أو Supabase
 * @returns {Promise<Object>} البيانات
 */
async function loadAppData() {
    try {
        // 1. تحميل من localStorage
        const localRaw = localStorage.getItem('ramzplay_data');
        let data = localRaw ? JSON.parse(localRaw) : JSON.parse(JSON.stringify(DEFAULT_DATA));

        // 2. إذا كان Supabase متاحاً، جلب أحدث البيانات ودمجها
        if (supabaseClient) {
            try {
                const { data: remote, error } = await supabaseClient
                    .from('app_data')
                    .select('payload')
                    .eq('id', 1)
                    .single();

                if (!error && remote && remote.payload) {
                    const remoteData = remote.payload;
                    // دمج عميق مع الحفاظ على البيانات المحلية
                    for (const key in remoteData) {
                        if (remoteData[key] !== undefined && remoteData[key] !== null) {
                            if (typeof remoteData[key] === 'object' && !Array.isArray(remoteData[key]) && remoteData[key] !== null) {
                                // دمج الكائنات
                                if (!data[key]) data[key] = {};
                                for (const subKey in remoteData[key]) {
                                    if (remoteData[key][subKey] !== undefined) {
                                        data[key][subKey] = remoteData[key][subKey];
                                    }
                                }
                            } else {
                                data[key] = remoteData[key];
                            }
                        }
                    }
                    // حفظ النسخة المدمجة محلياً
                    localStorage.setItem('ramzplay_data', JSON.stringify(data));
                    console.log('✅ Data synced from Supabase');
                }
            } catch (supabaseErr) {
                console.warn('⚠️ Could not fetch from Supabase, using local data:', supabaseErr.message);
            }
        }
        return data;
    } catch (err) {
        console.error('loadAppData error:', err);
        logAdminError(err, 'loadAppData');
        return JSON.parse(JSON.stringify(DEFAULT_DATA));
    }
}

/**
 * حفظ البيانات (محلياً وفي Supabase)
 * @param {Object} data - البيانات المراد حفظها
 * @param {Array<string>} tables - أسماء الجداول المراد تحديثها (اختياري)
 * @returns {Promise<boolean>} نجاح الحفظ
 */
async function saveAppData(data, tables = null) {
    try {
        // 1. حفظ محلياً دائماً
        localStorage.setItem('ramzplay_data', JSON.stringify(data));

        // 2. حفظ في Supabase إن أمكن
        if (supabaseClient) {
            // قائمة الجداول المتاحة
            const allTables = ['settings', 'categories', 'stores', 'products', 'testimonials', 'carousel', 'marquee', 'footer', 'design', 'adminErrors', 'purchasedProducts', 'updates', 'partners', 'messages'];
            // إذا لم يحدد المستخدم جداول، نحفظ كل شيء
            const tablesToSave = tables || allTables;
            const payload = {};
            tablesToSave.forEach(table => {
                if (data[table] !== undefined) payload[table] = data[table];
            });

            // إضافة طابع زمني
            const { error } = await supabaseClient
                .from('app_data')
                .upsert({
                    id: 1,
                    payload: payload,
                    updated_at: new Date().toISOString()
                });

            if (error) {
                console.warn('⚠️ Supabase save error:', error.message);
                return false;
            }
            console.log('✅ Data saved to Supabase');
            return true;
        }
        return true;
    } catch (err) {
        console.error('saveAppData error:', err);
        logAdminError(err, 'saveAppData');
        return false;
    }
}

// =====================================================
// ============ دوال رفع الصور والملفات ============
// =====================================================

/**
 * رفع صورة واستبدال القديمة (إن وجدت)
 * @param {File} file - ملف الصورة
 * @param {string} oldUrl - الرابط القديم (لحذفه)
 * @param {string} folder - اسم المجلد (مثل 'categories', 'stores')
 * @returns {Promise<string>} الرابط الجديد للصورة
 */
async function uploadAndReplaceImage(file, oldUrl, folder) {
    try {
        if (!supabaseClient) {
            // وضع عدم الاتصال - نستخدم Base64
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = e => resolve(e.target.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        }

        // حذف الصورة القديمة إذا كانت موجودة في التخزين
        if (oldUrl && oldUrl.includes('supabase.co/storage/v1/object/public/')) {
            try {
                const oldPath = oldUrl.split('/').pop();
                if (oldPath) {
                    await supabaseClient.storage.from(STORAGE_BUCKET).remove([`${folder}/${oldPath}`]);
                }
            } catch (e) { /* تجاهل أخطاء الحذف */ }
        }

        // رفع الصورة الجديدة
        const fileName = `${folder}/${Date.now()}_${file.name}`;
        const { data, error } = await supabaseClient.storage
            .from(STORAGE_BUCKET)
            .upload(fileName, file, { upsert: true });

        if (error) throw error;

        const { data: urlData } = supabaseClient.storage
            .from(STORAGE_BUCKET)
            .getPublicUrl(fileName);

        return urlData.publicUrl;
    } catch (err) {
        console.error('uploadAndReplaceImage error:', err);
        logAdminError(err, 'uploadAndReplaceImage');
        throw err;
    }
}

/**
 * رفع ملف (APK, PDF, ...)
 * @param {File} file - الملف المراد رفعه
 * @param {string} folder - اسم المجلد
 * @returns {Promise<{url: string, fileType: string}>}
 */
async function uploadFile(file, folder) {
    try {
        if (!supabaseClient) {
            // وضع عدم الاتصال
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = e => resolve({ url: e.target.result, fileType: file.type });
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        }

        const fileName = `${folder}/${Date.now()}_${file.name}`;
        const { data, error } = await supabaseClient.storage
            .from(STORAGE_BUCKET)
            .upload(fileName, file, { upsert: true });

        if (error) throw error;

        const { data: urlData } = supabaseClient.storage
            .from(STORAGE_BUCKET)
            .getPublicUrl(fileName);

        return { url: urlData.publicUrl, fileType: file.type };
    } catch (err) {
        console.error('uploadFile error:', err);
        logAdminError(err, 'uploadFile');
        throw err;
    }
}

// =====================================================
// ============ دوال المصادقة ============
// =====================================================

/**
 * التحقق من رمز الدخول
 * @param {string} code - الرمز المدخل
 * @returns {Promise<boolean>} صحة الرمز
 */
async function verifyPassword(code) {
    return code === ADMIN_CODE;
}

// =====================================================
// ============ دوال إدارة الفئات ============
// =====================================================

/**
 * إضافة فئة جديدة
 * @param {Object} category - بيانات الفئة
 * @returns {Promise<Object>} الفئة المضافة
 */
async function addCategory(category) {
    const data = await loadAppData();
    if (!data.categories) data.categories = [];
    const newCat = { id: 'cat_' + Date.now(), ...category };
    data.categories.push(newCat);
    await saveAppData(data, ['categories']);
    return newCat;
}

/**
 * تحديث فئة موجودة
 * @param {string} id - معرف الفئة
 * @param {Object} updatedData - البيانات المحدثة
 * @returns {Promise<Object>} الفئة المحدثة
 */
async function updateCategory(id, updatedData) {
    const data = await loadAppData();
    const index = data.categories.findIndex(c => c.id === id);
    if (index === -1) throw new Error('الفئة غير موجودة');
    data.categories[index] = { ...data.categories[index], ...updatedData };
    await saveAppData(data, ['categories']);
    return data.categories[index];
}

/**
 * حذف فئة
 * @param {string} id - معرف الفئة
 * @returns {Promise<void>}
 */
async function deleteCategory(id) {
    const data = await loadAppData();
    data.categories = data.categories.filter(c => c.id !== id);
    await saveAppData(data, ['categories']);
}

// =====================================================
// ============ دوال إدارة الرسائل ============
// =====================================================

/**
 * الحصول على جميع الرسائل
 * @returns {Array} قائمة الرسائل
 */
function getMessages() {
    const data = JSON.parse(localStorage.getItem('ramzplay_data') || '{}');
    return data.messages || [];
}

/**
 * إضافة رسالة جديدة
 * @param {Object} message - بيانات الرسالة
 * @returns {Promise<Object>} الرسالة المضافة
 */
async function addMessage(message) {
    const data = await loadAppData();
    if (!data.messages) data.messages = [];
    const newMsg = {
        id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8),
        ...message,
        date: new Date().toISOString(),
        status: 'new'
    };
    data.messages.push(newMsg);
    await saveAppData(data, ['messages']);
    return newMsg;
}

/**
 * تحديد رسالة كمقروءة
 * @param {string} msgId - معرف الرسالة
 * @returns {Promise<boolean>} نجاح العملية
 */
async function markMessageAsRead(msgId) {
    const data = await loadAppData();
    if (!data.messages) return false;
    const msg = data.messages.find(m => m.id === msgId);
    if (!msg) return false;
    msg.status = 'read';
    await saveAppData(data, ['messages']);
    return true;
}

/**
 * حذف رسالة
 * @param {string} msgId - معرف الرسالة
 * @returns {Promise<boolean>} نجاح العملية
 */
async function deleteMessage(msgId) {
    const data = await loadAppData();
    if (!data.messages) return false;
    data.messages = data.messages.filter(m => m.id !== msgId);
    await saveAppData(data, ['messages']);
    return true;
}

// =====================================================
// ============ دوال مساعدة ============
// =====================================================

/**
 * الحصول على المعاملات من localStorage
 * @returns {Array} قائمة المعاملات
 */
function getTransactions() {
    try {
        const raw = localStorage.getItem('transactions');
        return raw ? JSON.parse(raw) : [];
    } catch { return []; }
}

/**
 * إنشاء رابط مشاركة للتطبيق
 * @param {string} productId - معرف التطبيق
 * @returns {string} الرابط
 */
function getProductShareLink(productId) {
    return `${window.location.origin}${window.location.pathname}?product=${productId}`;
}

/**
 * تسجيل الأخطاء في سجل الإدارة
 * @param {Error|string} err - الخطأ
 * @param {string} context - السياق
 */
function logAdminError(err, context) {
    try {
        const data = JSON.parse(localStorage.getItem('ramzplay_data') || '{}');
        if (!data.adminErrors) data.adminErrors = [];
        data.adminErrors.push({
            time: new Date().toISOString(),
            context: context || 'unknown',
            message: err.message || String(err),
            stack: err.stack || ''
        });
        if (data.adminErrors.length > 50) data.adminErrors.shift();
        localStorage.setItem('ramzplay_data', JSON.stringify(data));
    } catch (e) {
        console.error('logAdminError failed:', e);
    }
}

/**
 * التحقق مما إذا كان المستخدم قد اشترى تطبيقاً معيناً
 * @param {string} productId - معرف التطبيق
 * @returns {boolean} هل تم الشراء
 */
function isProductPurchased(productId) {
    const data = JSON.parse(localStorage.getItem('ramzplay_data') || '{}');
    return (data.purchasedProducts || []).includes(productId);
}

/**
 * تسجيل شراء تطبيق
 * @param {string} productId - معرف التطبيق
 */
function markProductAsPurchased(productId) {
    const data = JSON.parse(localStorage.getItem('ramzplay_data') || '{}');
    if (!data.purchasedProducts) data.purchasedProducts = [];
    if (!data.purchasedProducts.includes(productId)) {
        data.purchasedProducts.push(productId);
        localStorage.setItem('ramzplay_data', JSON.stringify(data));
        saveAppData(data, ['purchasedProducts']).catch(console.error);
    }
}

/**
 * الحصول على إعدادات القائمة الجانبية
 * @returns {Object} إعدادات القائمة
 */
function getMenuSettings() {
    const data = JSON.parse(localStorage.getItem('ramzplay_data') || '{}');
    return data.settings?.menuSettings || DEFAULT_DATA.settings.menuSettings;
}

/**
 * الحصول على قائمة التحديثات
 * @returns {Array} قائمة التحديثات
 */
function getUpdates() {
    const data = JSON.parse(localStorage.getItem('ramzplay_data') || '{}');
    return data.updates || DEFAULT_DATA.updates;
}

/**
 * الحصول على قائمة الشركاء
 * @returns {Array} قائمة الشركاء
 */
function getPartners() {
    const data = JSON.parse(localStorage.getItem('ramzplay_data') || '{}');
    return data.partners || DEFAULT_DATA.partners;
}

/**
 * الحصول على عدد الزوار
 * @returns {number} عدد الزوار
 */
function getVisitorCount() {
    const data = JSON.parse(localStorage.getItem('ramzplay_data') || '{}');
    return data.settings?.visitorCount || 0;
}

/**
 * زيادة عداد الزوار
 */
function incrementVisitorCount() {
    const data = JSON.parse(localStorage.getItem('ramzplay_data') || '{}');
    if (!data.settings) data.settings = {};
    data.settings.visitorCount = (data.settings.visitorCount || 0) + 1;
    localStorage.setItem('ramzplay_data', JSON.stringify(data));
    saveAppData(data, ['settings']).catch(console.error);
}

// =====================================================
// ============ تصدير الدوال إلى window ============
// =====================================================
// هذا يضمن توفر جميع الدوال في النطاق العام لاستخدامها في index.html و admin.html

window.loadAppData = loadAppData;
window.saveAppData = saveAppData;
window.uploadAndReplaceImage = uploadAndReplaceImage;
window.uploadFile = uploadFile;
window.verifyPassword = verifyPassword;
window.logAdminError = logAdminError;
window.addCategory = addCategory;
window.updateCategory = updateCategory;
window.deleteCategory = deleteCategory;
window.getTransactions = getTransactions;
window.getProductShareLink = getProductShareLink;
window.isProductPurchased = isProductPurchased;
window.markProductAsPurchased = markProductAsPurchased;
window.getMenuSettings = getMenuSettings;
window.getUpdates = getUpdates;
window.getPartners = getPartners;
window.getVisitorCount = getVisitorCount;
window.incrementVisitorCount = incrementVisitorCount;
// دوال الرسائل الجديدة
window.getMessages = getMessages;
window.addMessage = addMessage;
window.markMessageAsRead = markMessageAsRead;
window.deleteMessage = deleteMessage;

// تصدير الثوابت أيضاً
window.ADMIN_CODE = ADMIN_CODE;
window.DEFAULT_DATA = DEFAULT_DATA;
window.SUPABASE_URL = SUPABASE_URL;
window.SUPABASE_ANON_KEY = SUPABASE_ANON_KEY;
window.STORAGE_BUCKET = STORAGE_BUCKET;

// =====================================================
// ============ رسالة الترحيب في الكونسول ============
// =====================================================
console.log('✅ Ramzplay common.js loaded successfully');
console.log('🔗 Supabase URL:', SUPABASE_URL);
console.log('📁 Storage bucket:', STORAGE_BUCKET);
console.log('🔑 Admin code:', ADMIN_CODE);
console.log('💡 Use Ctrl+Shift+A to open admin panel (if supported)');
console.log('© 2026 جميع الحقوق محفوظة للمهندس رمزي الصلاحي');

// =====================================================
// ============ تهيئة البيانات ============
// =====================================================
(async function initData() {
    try {
        const data = await loadAppData();
        let needsSave = false;
        for (const key in DEFAULT_DATA) {
            if (!(key in data)) {
                data[key] = DEFAULT_DATA[key];
                needsSave = true;
            }
        }
        // التأكد من وجود messages في البيانات
        if (!data.messages) {
            data.messages = [];
            needsSave = true;
        }
        if (needsSave) {
            await saveAppData(data);
            console.log('🔄 تم تهيئة البيانات الافتراضية (بما فيها messages)');
        }
    } catch (e) {
        console.error('Init data error:', e);
    }
})();

// ============================================================
// نهاية common.js
// ============================================================
