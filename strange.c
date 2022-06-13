
	while (!(Wait_for("EOF", wifi_uart)));

	char buftocopyinto[64] = {0};
	while (!(Copy_upto(" EOF", buftocopyinto, wifi_uart)));
	printf("EOF found!\r\n");


while (!(Get_after("+IPD,", 1, &thisBuff, wifi_uart)));

void Server_Start (void)
{
	char buftocopyinto[64] = {0};
	char Link_ID;
	while (!(Get_after("+IPD,", 1, &Link_ID, wifi_uart)));
	Link_ID -= 48;
	while (!(Copy_upto(" HTTP/1.1", buftocopyinto, wifi_uart)));
	if (Look_for("/ledon", buftocopyinto) == 1)
	{
		HAL_GPIO_WritePin(GPIOA, GPIO_PIN_5, 1);
		Server_Handle("/ledon",Link_ID);
	}

	else if (Look_for("/ledoff", buftocopyinto) == 1)
	{
		HAL_GPIO_WritePin(GPIOA, GPIO_PIN_5, 0);
		Server_Handle("/ledoff",Link_ID);
	}

	else if (Look_for("/favicon.ico", buftocopyinto) == 1);

	else
	{
		HAL_GPIO_WritePin(GPIOA, GPIO_PIN_5, 0);
		Server_Handle("/ ", Link_ID);
	}
}


	for(int chNum = 0; chNum < 6; chNum++){
		int _timeOut = 0;
		while (!(IsDataAvailable(wifi_uart))){
			if(_timeOut > 31950){
				printf("timeout\r\n");
				break;
			}

			_timeOut++;
			HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_5);
		}

		printf("%c\r\n", Uart_read(wifi_uart));

	}



	while (!(Wait_for("+IPD", wifi_uart))){
		if(_timeOut > 31950){
			printf("IPD timeout\r\n");
			break;
		}

		_timeOut++;
		HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_5);
	}


	printf("IPD Found\r\n");

	while (!(IsDataAvailable(wifi_uart))){
		if(_timeOut > 31950){
			printf("timeout\r\n");
			break;
		}

		_timeOut++;
		HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_5);
	}printf("%c\r\n", Uart_read(wifi_uart));
	while (!(IsDataAvailable(wifi_uart))){
		if(_timeOut > 31950){
			printf("timeout\r\n");
			break;
		}

		_timeOut++;
		HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_5);
	}printf("%c\r\n", Uart_read(wifi_uart));
	while (!(IsDataAvailable(wifi_uart))){
		if(_timeOut > 31950){
			printf("timeout\r\n");
			break;
		}

		_timeOut++;
		HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_5);
	}printf("%c\r\n", Uart_read(wifi_uart));
	while (!(IsDataAvailable(wifi_uart))){
		if(_timeOut > 31950){
			printf("timeout\r\n");
			break;
		}

		_timeOut++;
		HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_5);
	}printf("%c\r\n", Uart_read(wifi_uart));
	while (!(IsDataAvailable(wifi_uart))){
		if(_timeOut > 31950){
			printf("timeout\r\n");
			break;
		}

		_timeOut++;
		HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_5);
	}printf("%c\r\n", Uart_read(wifi_uart));



aaa

		while (!(IsDataAvailable(wifi_uart))){
			if(_timeOut > 31950){
				printf("tlqkf timeout\r\n");
				_totalOut++;
				break;
			}
			_timeOut++;
			HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_5);
		}

		printf("DATA FOUND : %d\r\n", _indexCnt);
		_indexCnt++;
		*/

		if(_totalOut > 100){
			printf("no char expected\r\n");
			break;
		}
		




	/*******AT+CIPRECVMODE=1 -> to set +IPD or +RECVDATA***/
	Uart_sendstring("AT+CIPRECVMODE=0\r\n", wifi_uart);
	/*
	 * 모드가 1이면 수신 명령을 보내야함
	 * 0이면 +IPD로 받아옴
	 *
	 */
	while (!(Wait_for("OK\r\n", wifi_uart)));



else if(popcornking == 73){
				recvBuffer[0] = popcornking;
			}