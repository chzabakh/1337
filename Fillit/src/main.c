/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/05/23 16:58:04 by chzabakh          #+#    #+#             */
/*   Updated: 2019/06/24 02:33:01 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "fillit.h"

int		main(int argc, char **argv)
{
	if (argc != 2)
	{
		ft_putstr("usage: fillit target_file\n");
		exit(0);
	}
	if (ft_open(argv[1]) == 0)
	{
		ft_putstr("error\n");
		exit(0);
	}
	return (0);
}
