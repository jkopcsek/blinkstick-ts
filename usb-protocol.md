
## USB Read (host reads from device)

### Report 1

Nothing

### Report 2 & 3 (name of device)

Read bytes from eeprom

## USB Write (host writes to device)

### Report 1 (device color)

[reportId, red, green, blue]

### Report 2 & 3 (name of device)

Write bytes to eeprom

### Report 5 (indexed device color)

[reportId, channel, index, red, green, blue]

### Report 6 (bulk write of 8 LEDs)

[reportId, channel] + [red, green, blue] x 8

### Report 7 (bulk write of 16 LEDs)

[reportId, channel] + [red, green, blue] x 16

### Report 8 (bulk write of 8 LEDs)

[reportId, channel] + [red, green, blue] x 32

### Report 9 (bulk write of 8 LEDs)

[reportId, channel] + [red, green, blue] x 64
