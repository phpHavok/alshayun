TARGET := qds-backend.sif

$(TARGET): Singularity
	sudo singularity build -F $@ $<

start: $(TARGET)
	singularity instance start -B www:/srv/www \
		$(TARGET) qds-backend

stop:
	singularity instance stop -F qds-backend

run: $(TARGET)
	singularity run -p -B www:/srv/www $(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: start stop run clean
