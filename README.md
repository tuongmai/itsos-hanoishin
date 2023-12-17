### Yêu cầu cài đặt sẵn

1. Cài đặt `docker` (tham khảo tại https://docs.docker.com/desktop/install/windows-install/)
2. Cài đặt `NodeJS`
3. Cài đặt `pgadmin v6.15` hoặc mới hơn

### Các bước chạy project

1. Khởi chạy database `Postgresql`

Copy file `.env.sample` sang file `.env`

Chạy command `docker-compose up`

Sau đó có thể dùng `pgadmin` để kết nối với database qua những thông tin trong file `.env`

2. Install dependencies

Chạy command `npm i` để install các package sử dụng trong project

3. Chạy migrate cho database

Chạy command `npm run migrate`

Mỗi khi thực hiện thay đổi trong database, tạo 1 file migration mới trong thư mục `/migrations`, sau đó sử dụng command `npm run migrate` để chạy file migration đó

Khi xảy ra lỗi và muốn undo, sử dụng command `npm run migrate-undo` để hoàn tác

3. Chạy seeding cho database

Chạy command `npm run seed`

Mỗi khi thực hiện thêm seed trong database, tạo 1 file seeder mới trong thư mục `/seeders`, sau đó sử dụng command `npm run seed` để chạy file seeder đó

Khi xảy ra lỗi và muốn undo, sử dụng command `npm run seed-undo` để hoàn tác

4. Khởi chạy front-end

Chạy command `npm run watch-client`, mỗi khi thay đổi bất kì file nào trong `/front-end`, mọi thay đổi sẽ đuọc cập nhật tự động

5. Khởi chạy back-end

Chạy command `npm run watch-server`, mỗi khi thay đổi bất kì file nào liên quan đến back-end, mọi thay đổi sẽ được cập nhật tự động

Sau khi chạy xong, app sẽ được host trên `localhost:8000`

### Code back-end

Trong project này sử dụng `sequelize` (tham khảo tại https://sequelize.org/docs/v6/getting-started/) để giao tiếp với database

1. Khi thực hiện thay đổi liên quan đến các bảng trong database: 
  * Tạo 1 file trong `/migrations` với số thứ tự ở đầu tên file
  * Tạo/thay đổi model trong `/models` để tạo/thay đổi model tương ứng với các bảng trong database (nếu cần)
  * Chạy `npm run migrate` để thực hiện thay đổi
  * Chạy `npm run migrate-undo` khi cần chỉnh sửa lại file migration

2. Tạo API
  * Tạo router cho API trong file tương ứng trong folder `/back-end/routes`
  * Tạo controller cho API trong file tương ứng trong folder `/back-end/controllers`
  * TH tạo router trong file mới, cần export thêm router tỏng file `/back-end/routes/index.js` và wire up router trong file `app.js`
  * Có thể sử dụng `postman` để test các API, hiện tại các API không yêu cầu xác thực

### Code front-end

Tạo các components mới trong folder `/front-end/page`

Khi tạo một màn mới, cần tạo thêm 1 file `.hbs` (tương tự html) trong `views` và thêm entry trong file `webpack.config.js`

Ảnh, font chữ, ... được đặt trong `/public`

### Seeding dữ liệu

Chạy `npm run seed` để thực hiện seed

Cần migrate lại trước khi seed lại, vì `npm run seed-undo-all` không thay đổi auto-increment, làm dữ liệu trong file seed sẽ bị lỗi.