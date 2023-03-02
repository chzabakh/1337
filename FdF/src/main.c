/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/19 14:52:58 by chzabakh          #+#    #+#             */
/*   Updated: 2019/11/20 00:34:34 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "fdf.h"

int		main(int argc, char *argv[])
{
	char			*fs;
	t_mlx			m;
	int				i;

	i = -1;
	fs = NULL;
	if (argc != 3)
	{
		ft_putstr("usage: fdf [target_file] [mode(isometric/parallel)]\n");
		exit(0);
	}
	m = (ft_open(argv[1], &fs));
	free(fs);
	ft_menu();
	if (ft_strcmp(argv[2], "isometric") == 0)
		ft_imageiso(m);
	else if (ft_strcmp(argv[2], "parallel") == 0)
		ft_image(m);
	else
		ft_putstr("you can chose isometric or parallel modes only\n");
	while (i < m.l)
		free(m.intable[i++]);
	free(m.intable);
	return (0);
}
