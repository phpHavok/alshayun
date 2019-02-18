TARGET := qds-frontend.sif

$(TARGET): Singularity
	sudo singularity build -F $@ $<

start: $(TARGET)
	singularity instance start -c -B serve:/srv/www $(TARGET) qds-frontend

stop:
	singularity instance stop -F qds-frontend

run: $(TARGET)
	singularity run -p -c -B serve:/srv/www $(TARGET)

shell: $(TARGET)
	singularity shell -p -c -B serve:/srv/www $(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: start stop run shell clean
