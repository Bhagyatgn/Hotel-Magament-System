-- Add missing columns to rooms table
USE hotel_booking;

ALTER TABLE rooms 
ADD COLUMN description TEXT AFTER status,
ADD COLUMN image_url VARCHAR(255) AFTER description;
