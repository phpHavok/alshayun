TARGET := qds-backend.sif

$(TARGET): Singularity
	sudo singularity build -F $@ $<

start: $(TARGET)
	singularity instance start -B serve:/srv/www \
		$(TARGET) qds-backend

stop:
	singularity instance stop -F qds-backend

run: $(TARGET)
	singularity run -p -B serve:/srv/www $(TARGET)

shell: $(TARGET)
	singularity shell -p -B serve:/srv/www $(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: start stop run shell clean
