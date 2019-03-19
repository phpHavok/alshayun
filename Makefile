SIF := ionic.sif

shell: $(SIF) sdk
	@find sdk -maxdepth 1 -not -path sdk \
		-exec sh -c "echo {}:/usr/local/android/\`basename {}\`" \; \
		| paste -s -d, \
		| xargs -I {} echo singularity shell -B {} -p $<

$(SIF):
	singularity pull ionic.sif library://phphavok/default/ionic:latest

.PHONY: shell
